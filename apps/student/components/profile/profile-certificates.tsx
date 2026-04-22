"use client"

import { Award, Download, Share2, Calendar, CheckCircle2 } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"

const certificates = [
  {
    id: "CERT-2026-001",
    name: "Chứng chỉ Kỹ năng tư vấn bảo hiểm cơ bản",
    issueDate: "15/04/2026",
    expiryDate: "15/04/2028",
    issuer: "E-Broker Academy",
    status: "active",
    image: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=400&h=300&fit=crop",
  },
  {
    id: "CERT-2026-002",
    name: "Chứng chỉ Chăm sóc khách hàng VIP",
    issueDate: "10/04/2026",
    expiryDate: "10/04/2028",
    issuer: "E-Broker Academy",
    status: "active",
    image: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=400&h=300&fit=crop",
  },
  {
    id: "CERT-2025-015",
    name: "Chứng chỉ Đạo đức nghề nghiệp",
    issueDate: "20/12/2025",
    expiryDate: "20/12/2027",
    issuer: "Hiệp hội Bảo hiểm Việt Nam",
    status: "active",
    image: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=400&h=300&fit=crop",
  },
]

export function ProfileCertificates() {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Chứng chỉ đạt được
        </h3>
        <Badge variant="outline" className="bg-green-50 text-green-700">
          {certificates.length} chứng chỉ
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="group rounded-xl border border-outline-variant/15 overflow-hidden hover:border-primary/30 transition-all hover:shadow-md"
          >
            {/* Certificate Preview */}
            <div className="relative h-40 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 flex items-center justify-center">
              <Award className="h-16 w-16 text-amber-400" />
              <div className="absolute top-3 right-3">
                <Badge className="bg-green-100 text-green-700 border-0">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Còn hiệu lực
                </Badge>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">
                {cert.name}
              </h4>
              <div className="space-y-1 text-sm text-slate-500 mb-4">
                <p className="flex items-center gap-2">
                  <span className="text-slate-400">Mã:</span> {cert.id}
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5" />
                  Cấp ngày: {cert.issueDate}
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5" />
                  Hết hạn: {cert.expiryDate}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 rounded-lg gap-2"
                >
                  <Download className="h-4 w-4" />
                  Tải xuống
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-lg"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
