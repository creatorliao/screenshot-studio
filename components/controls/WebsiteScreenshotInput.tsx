'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useEditorStore, useImageStore } from '@/lib/store'
import { Loading03Icon, Globe02Icon, ComputerIcon, SmartPhone01Icon } from 'hugeicons-react'

type DeviceType = 'desktop' | 'mobile'

export function WebsiteScreenshotInput() {
  const [url, setUrl] = React.useState('')
  const [deviceType, setDeviceType] = React.useState<DeviceType>('desktop')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const { setScreenshot } = useEditorStore()
  const { setImage } = useImageStore()

  const normalizeUrl = (urlString: string): string => {
    let normalized = urlString.trim()
    
    // Remove leading/trailing whitespace
    normalized = normalized.trim()
    
    // If URL doesn't start with http:// or https://, add https://
    if (!normalized.match(/^https?:\/\//i)) {
      normalized = `https://${normalized}`
    }
    
    return normalized
  }

  const validateUrl = (urlString: string): { valid: boolean; normalized?: string; error?: string } => {
    try {
      const normalized = normalizeUrl(urlString)
      const urlObj = new URL(normalized)
      
      // Ensure URL has http or https protocol
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        return { valid: false, error: 'URL 必须使用 http 或 https 协议' }
      }
      
      // Basic validation - must have a hostname
      if (!urlObj.hostname || urlObj.hostname.length === 0) {
        return { valid: false, error: '请输入带域名的有效 URL' }
      }
      
      return { valid: true, normalized }
    } catch (error) {
      return { valid: false, error: '请输入有效的 URL（例如 example.com 或 https://example.com）' }
    }
  }

  const handleCapture = async () => {
    if (!url.trim()) {
      setError('请输入网址')
      return
    }

    // Validate and normalize URL
    const validation = validateUrl(url)
    if (!validation.valid) {
      setError(validation.error || 'Please enter a valid URL')
      return
    }

    const finalUrl = validation.normalized!

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/screenshot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: finalUrl, deviceType }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to capture screenshot')
      }

      if (!data.screenshot || typeof data.screenshot !== 'string') {
        throw new Error('Invalid screenshot data received from server')
      }

      // Convert base64 to blob URL
      let base64Data = data.screenshot.trim()
      
      // Remove data URL prefix if present (e.g., "data:image/png;base64,")
      if (base64Data.includes(',')) {
        base64Data = base64Data.split(',')[1]
      }
      
      // Clean base64 string (remove whitespace and newlines)
      base64Data = base64Data.replace(/\s/g, '')
      
      if (!base64Data) {
        throw new Error('Empty screenshot data received')
      }

      let byteCharacters: string
      try {
        byteCharacters = atob(base64Data)
      } catch (decodeError) {
        console.error('Base64 decode error:', decodeError)
        throw new Error('Failed to decode screenshot data. The image may be corrupted.')
      }

      const byteNumbers = new Array(byteCharacters.length)
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      const blob = new Blob([byteArray], { type: 'image/png' })
      const blobUrl = URL.createObjectURL(blob)

      // Create a File object from the blob
      const file = new File([blob], 'screenshot.png', { type: 'image/png' })

      // Update stores immediately
      setScreenshot({ src: blobUrl })
      setImage(file)

      // Clear form
      setUrl('')
    } catch (error) {
      console.error('Screenshot error:', error)
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to capture screenshot. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleCapture()
    }
  }

  return (
    <div className="w-full space-y-4">
      <div className="space-y-2">
        <Label htmlFor="website-url" className="text-sm font-medium">
          网站 URL
        
        </Label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Globe02Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              id="website-url"
              type="url"
              placeholder="example.com or https://example.com"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value)
                setError(null)
              }}
              onBlur={(e) => {
                const value = e.target.value.trim()
                if (value) {
                  const validation = validateUrl(value)
                  if (validation.valid && validation.normalized && validation.normalized !== value) {
                    setUrl(validation.normalized)
                  }
                }
              }}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="pl-9"
            />
          </div>
          <Button
            onClick={handleCapture}
            disabled={isLoading || !url.trim()}
            className="shrink-0"
          >
            {isLoading ? (
              <>
                <Loading03Icon className="h-4 w-4 mr-2 animate-spin" />
                正在抓取...
              
              </>
            ) : (
              '截取'
            )}
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Label htmlFor="device-type" className="text-sm font-medium whitespace-nowrap">
            设备类型：
          
          </Label>
          <Select value={deviceType} onValueChange={(value) => setDeviceType(value as DeviceType)} disabled={isLoading}>
            <SelectTrigger id="device-type" className="w-[140px]">
              <SelectValue>
                {deviceType === 'desktop' ? (
                  <span className="flex items-center gap-2">
                    <ComputerIcon className="h-4 w-4" />
                    桌面端
                  
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <SmartPhone01Icon className="h-4 w-4" />
                    移动端
                  
                  </span>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desktop">
                <span className="flex items-center gap-2">
                  <ComputerIcon className="h-4 w-4" />
                  桌面端
                
                </span>
              </SelectItem>
              <SelectItem value="mobile">
                <span className="flex items-center gap-2">
                  <SmartPhone01Icon className="h-4 w-4" />
                  移动端
                
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p className="text-xs text-muted-foreground">
          输入网站 URL 以截取视口截图。选择桌面端（1920x1080）或移动端（375x667）视口尺寸。
        
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3">
          <p className="text-xs sm:text-sm text-destructive">{error}</p>
        </div>
      )}

      {isLoading && (
        <div className="rounded-lg border border-border bg-muted p-8 flex flex-col items-center justify-center min-h-[200px]">
          <Loading03Icon className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-sm text-muted-foreground">
            正在抓取截图...
          
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            这可能需要几秒钟
          
          </p>
        </div>
      )}
    </div>
  )
}

