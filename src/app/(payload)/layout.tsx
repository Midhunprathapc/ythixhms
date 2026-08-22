import configPromise from '@payload-config'
import '@payloadcms/next/css'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import { importMap } from './importMap.js'
import React from 'react'

type Args = {
  children: React.ReactNode
}

const Layout = ({ children }: Args) => (
  // @ts-expect-error serverFunction type mismatch between payload core and next template
  <RootLayout config={configPromise} importMap={importMap} serverFunction={handleServerFunctions}>{children}</RootLayout>
)

export default Layout
