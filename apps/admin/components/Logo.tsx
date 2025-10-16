"use client"

import Image from "next/image"
import { useTheme } from "next-themes"

export default function Logo({ size = 120 }: { size?: number }) {
  const { theme } = useTheme()

  const logoSrc =
    theme === "light" ? "/logo-light.png" : "/logo-dark.png"

  return (
    <Image
      src={logoSrc}
      alt="Bazaar Logo"
      width={size}
      height={size}
      priority
      className="transition-opacity duration-300"
    />
  )
}
