import { BaseService } from "./base.service"
import type {
  CreateNotificationDto,
  Notification,
  NotificationEventResponse,
  NotificationListQuery,
  QueueNotificationEventDto,
  UnreadCountQuery,
  UnreadCountResponse,
} from "../types/notifications.types"

export class NotificationsService extends BaseService {
  create(data: CreateNotificationDto) {
    return this.client.post<Notification>("/notifications", data)
  }

  list(params?: NotificationListQuery) {
    const query = new URLSearchParams()
    if (params?.page) query.set("page", String(params.page))
    if (params?.limit) query.set("limit", String(params.limit))
    if (params?.tenantId) query.set("tenantId", params.tenantId)
    if (params?.userId) query.set("userId", params.userId)
    if (params?.type) query.set("type", params.type)
    if (params?.status) query.set("status", params.status)
    const qs = query.toString()
    return this.client.get<Notification[]>(
      `/notifications${qs ? `?${qs}` : ""}`
    )
  }

  getUnreadCount(params: UnreadCountQuery) {
    const query = new URLSearchParams()
    query.set("userId", params.userId)
    query.set("tenantId", params.tenantId)
    return this.client.get<UnreadCountResponse>(`/notifications/unread-count?${query.toString()}`)
  }

  markRead(id: string) {
    return this.client.patch<Notification>(`/notifications/${id}/read`)
  }

  remove(id: string) {
    return this.client.delete<void>(`/notifications/${id}`)
  }

  queueNewCourse(data: QueueNotificationEventDto) {
    return this.client.post<NotificationEventResponse>(
      "/notifications/events/new-course",
      data
    )
  }

  queueStudyReminder(data: QueueNotificationEventDto) {
    return this.client.post<NotificationEventResponse>(
      "/notifications/events/study-reminder",
      data
    )
  }
}
