"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
});

export function Pricing() {
  return (
    <section className="w-full py-12 sm:py-16 px-4 sm:px-6 border-t border-border bg-background">
      <div className="container mx-auto max-w-4xl">
        <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 px-2 ${instrumentSerif.className}`}>
          定价
        
        </h2>
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto px-2 sm:px-0">
          {/* Free Plan */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">免费</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                适合入门
              
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div className="space-y-2">
                <p className="text-3xl font-bold">$0</p>
                <p className="text-sm text-muted-foreground">永久免费</p>
              </div>
              <ul className="space-y-2 text-sm sm:text-base">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>基础画布编辑器</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>图片上传</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>文字编辑</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>标准导出</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/" className="w-full">
                <Button variant="integration" className="w-full">
                  开始使用
                
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="flex flex-col border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">专业版</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                面向认真的创作者
              
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div className="space-y-2">
                <p className="text-3xl sm:text-4xl font-bold">$7</p>
                <p className="text-sm text-muted-foreground">一次性付款</p>
              </div>
              <ul className="space-y-2 text-sm sm:text-base">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>免费版全部功能</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>无限次导出</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>高分辨率下载</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>优先支持</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/" className="w-full">
                <Button variant="integration" className="w-full">
                  升级到 Pro
                
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}

