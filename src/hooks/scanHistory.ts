import { useEffect, useRef, useState } from 'react'

type ScanHistory = {
  url: string
  scanedAt: Date
}

function convertPersistToHistory(value: string): Map<string, ScanHistory> {
  return new Map(Object.entries(JSON.parse(value)))
}
function converthistoryToPersist(value: Map<string, ScanHistory>): string {
  return JSON.stringify(Object.fromEntries(value.entries()))
}

function loadItem() {
  return convertPersistToHistory(localStorage.getItem(KEY) ?? '{}')
}
function savetItem(value: Map<string, ScanHistory>) {
  localStorage.setItem(KEY, converthistoryToPersist(value))
}

const KEY = '@qramen/history'

export function useScanHistory() {
  const [historyMap, setHistoryMap] = useState<Map<string, ScanHistory>>(
    loadItem()
  )
  const history = [...historyMap.entries()]
    .map(([, value]) => value)
    .sort((a, b) => a.scanedAt.getTime() - b.scanedAt.getTime())

  function append(url: string) {
    const item: ScanHistory = {
      url,
      scanedAt: new Date(),
    }
    historyMap.set(url, item)
    const newMap = new Map(historyMap.entries())
    savetItem(newMap)
    setHistoryMap(newMap)
  }

  return {
    history,
    append,
  }
}
