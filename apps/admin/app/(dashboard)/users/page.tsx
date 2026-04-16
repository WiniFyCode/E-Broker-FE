import { UsersTable } from "@/components/users/users-table";

export default function UsersPage() {
    return (
        <div className="flex flex-col gap-4 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                    <p className="text-muted-foreground">
                        Quản lý tất cả người dùng trong hệ thống
                    </p>
                </div>
            </div>

            {/* Table */}
            <UsersTable />
        </div>
    );
}
