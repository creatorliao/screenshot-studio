import type { Metadata } from "next";
import { cookies } from "next/headers";
import { StoreScreenshotWorkspace } from "@/components/store-screenshots/StoreScreenshotWorkspace";
import { STORE_PROJECT_HINT_COOKIE } from "@/lib/store-screenshots/storage";

export const metadata: Metadata = {
  title: "App Store Screenshot Maker",
  description: "Create coordinated, customizable screenshots for the Apple App Store.",
  openGraph: {
    title: "App Store Screenshot Maker - Screenshot Studio",
    description: "Create coordinated, customizable screenshots for the Apple App Store.",
    url: "/store-screenshots",
  },
  alternates: {
    canonical: "/store-screenshots",
  },
};

export default async function StoreScreenshotsPage(): Promise<React.JSX.Element> {
  const cookieStore = await cookies();
  const hasSavedProject = cookieStore.get(STORE_PROJECT_HINT_COOKIE)?.value === "1";

  return <StoreScreenshotWorkspace initialHasSavedProject={hasSavedProject} />;
}
