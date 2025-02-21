'use client'

import { useEffect } from 'react'

// export function useHydrationDebug() {
//   useEffect(() => {
//     if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
//       console.log('Hydration State:', {
//         timestamp: Date.now(),
//         documentState: {
//           lang: document.documentElement.lang,
//           htmlClasses: document.documentElement.className,
//           bodyClasses: document.body.className,
//         }
//       })
//     }
//   }, [])
// }