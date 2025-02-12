import type { Metadata } from "next"
import Script from "next/script"
import type React from "react" // Import React

export const metadata: Metadata = {
  title: "لبنة",
  description: "حاسبة مساحة المثلث",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" content="#111111" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#eeeeee" media="(prefers-color-scheme: dark)" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.rtl.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.3/font/bootstrap-icons.min.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body>
        {children}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/js/bootstrap.bundle.min.js" />
      </body>
    </html>
  )
}

import "./globals.css"
import "./table.css"

