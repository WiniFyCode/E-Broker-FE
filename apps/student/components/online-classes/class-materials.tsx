"use client"

import { FileText, Download } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

interface Material {
  name: string
  size: string
}

interface ClassMaterialsProps {
  materials: Material[]
}

export function ClassMaterials({ materials }: ClassMaterialsProps) {
  return (
    <section className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-6">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
        <Download className="h-5 w-5 text-primary" />
        Tài liệu học tập
      </h2>
      <div className="space-y-3">
        {materials.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg border border-outline-variant/15 hover:bg-surface-container-high transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <FileText className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-100 text-sm">
                  {file.name}
                </p>
                <p className="text-xs text-slate-500">{file.size}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Tải xuống
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}
