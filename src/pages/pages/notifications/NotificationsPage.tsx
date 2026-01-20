import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Bell, CheckCircle, AlertTriangle, XCircle, Info, Package, Shield, Mail,
  Search, Trash2, CheckCheck, Clock, Settings, MailOpen, Star, StarOff, MoreVertical,
} from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Notification, NotificationType, NotificationCategory } from '@/types/notification';

// ==========================================
// MOCK DATA
// ==========================================
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    category: 'batches',
    title: 'Batch Creation Complete',
    message: 'Batch #B-2024-0892 "Château Margaux 2020" has been successfully created with 2,400 bottles.',
    timestamp: '2 minutes ago',
    read: false,
    starred: false,
    actionUrl: '/dashboard/batches/B-2024-0892',
    actionLabel: 'View Batch',
  },
  {
    id: '2',
    type: 'warning',
    category: 'security',
    title: 'Unusual Scan Activity Detected',
    message: 'High volume of scans detected from region EU-WEST. 847 scans in the last hour.',
    timestamp: '15 minutes ago',
    read: false,
    starred: true,
    actionUrl: '/dashboard/security',
    actionLabel: 'View Security',
  },
  {
    id: '3',
    type: 'info',
    category: 'email',
    title: 'Lab Report Received',
    message: 'New laboratory analysis report received from Georgian Wine Laboratory for Product "Saperavi Reserve 2021".',
    timestamp: '1 hour ago',
    read: false,
    starred: false,
    actionUrl: '/dashboard/documents',
    actionLabel: 'View Document',
  },
  {
    id: '4',
    type: 'success',
    category: 'batches',
    title: 'QR Codes Generated',
    message: '1,200 Dual QR codes have been generated for Batch #B-2024-0891.',
    timestamp: '2 hours ago',
    read: true,
    starred: false,
    actionUrl: '/dashboard/batches/B-2024-0891',
    actionLabel: 'Download QRs',
  },
  {
    id: '5',
    type: 'error',
    category: 'security',
    title: 'Authentication Attempt Blocked',
    message: 'Failed authentication attempt from IP 192.168.1.45 was blocked. 3 attempts in 5 minutes.',
    timestamp: '3 hours ago',
    read: true,
    starred: true,
    actionUrl: '/dashboard/security',
    actionLabel: 'View Details',
  },
  {
    id: '6',
    type: 'info',
    category: 'system',
    title: 'System Maintenance Scheduled',
    message: 'Scheduled maintenance window: January 15, 2026, 02:00-04:00 UTC.',
    timestamp: '5 hours ago',
    read: true,
    starred: false,
  },
  {
    id: '7',
    type: 'success',
    category: 'email',
    title: 'Verification Email Confirmed',
    message: 'Your email address has been successfully verified.',
    timestamp: '1 day ago',
    read: true,
    starred: false,
  },
  {
    id: '8',
    type: 'warning',
    category: 'batches',
    title: 'Batch Expiry Warning',
    message: 'Batch #B-2023-0456 QR codes will expire in 30 days. Consider renewal.',
    timestamp: '2 days ago',
    read: true,
    starred: false,
    actionUrl: '/dashboard/batches/B-2023-0456',
    actionLabel: 'Renew Batch',
  },
];

// ==========================================
// HELPER FUNCTIONS
// ==========================================
const getTypeIcon = (type: NotificationType) => {
  switch (type) {
    case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    case 'error': return <XCircle className="h-5 w-5 text-red-500" />;
    default: return <Info className="h-5 w-5 text-blue-500" />;
  }
};

const getCategoryIcon = (category: NotificationCategory) => {
  switch (category) {
    case 'batches': return <Package className="h-4 w-4" />;
    case 'security': return <Shield className="h-4 w-4" />;
    case 'email': return <Mail className="h-4 w-4" />;
    case 'system': return <Settings className="h-4 w-4" />;
    default: return <Bell className="h-4 w-4" />;
  }
};

const getCategoryBadgeColor = (category: NotificationCategory) => {
  switch (category) {
    case 'batches': return 'bg-purple-500/10 text-purple-600 border-purple-500/30';
    case 'security': return 'bg-red-500/10 text-red-600 border-red-500/30';
    case 'email': return 'bg-blue-500/10 text-blue-600 border-blue-500/30';
    case 'system': return 'bg-gray-500/10 text-gray-600 border-gray-500/30';
    default: return '';
  }
};

// ==========================================
// COMPONENT
// ==========================================
export default function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState<NotificationCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filter notifications
  const filteredNotifications = notifications.filter((n) => {
    const matchesTab = activeTab === 'all' || n.category === activeTab;
    const matchesSearch = searchQuery === '' ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;
  const starredCount = notifications.filter((n) => n.starred).length;

  // Actions
  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleStar = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, starred: !n.starred } : n)));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const deleteSelected = () => {
    setNotifications((prev) => prev.filter((n) => !selectedIds.includes(n.id)));
    setSelectedIds([]);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const selectAll = () => {
    if (selectedIds.length === filteredNotifications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredNotifications.map((n) => n.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-sm text-muted-foreground">
            Stay updated with batch events, security alerts, and system messages
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Bell className="h-3 w-3" />
            {unreadCount} unread
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Star className="h-3 w-3 text-yellow-500" />
            {starredCount} starred
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Bell className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{notifications.length}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/10">
                <MailOpen className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{unreadCount}</p>
                <p className="text-xs text-muted-foreground">Unread</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/10">
                <Shield className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {notifications.filter((n) => n.category === 'security').length}
                </p>
                <p className="text-xs text-muted-foreground">Security</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Package className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {notifications.filter((n) => n.category === 'batches').length}
                </p>
                <p className="text-xs text-muted-foreground">Batch Events</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardContent className="p-6">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            <div className="flex items-center gap-2">
              {selectedIds.length > 0 && (
                <>
                  <Button variant="outline" size="sm" onClick={deleteSelected}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete ({selectedIds.length})
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => {
                    selectedIds.forEach((id) => markAsRead(id));
                    setSelectedIds([]);
                  }}>
                    <CheckCheck className="h-4 w-4 mr-1" />
                    Mark Read
                  </Button>
                </>
              )}
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <CheckCheck className="h-4 w-4 mr-1" />
                Mark All Read
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as NotificationCategory)}>
            <TabsList className="mb-4">
              <TabsTrigger value="all" className="gap-1">
                <Bell className="h-4 w-4" /> All
                <Badge variant="secondary" className="ml-1 h-5 px-1.5">{notifications.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="batches" className="gap-1">
                <Package className="h-4 w-4" /> Batches
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-1">
                <Shield className="h-4 w-4" /> Security
              </TabsTrigger>
              <TabsTrigger value="email" className="gap-1">
                <Mail className="h-4 w-4" /> Email
              </TabsTrigger>
              <TabsTrigger value="system" className="gap-1">
                <Settings className="h-4 w-4" /> System
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              {/* Select All */}
              <div className="flex items-center gap-2 pb-3 border-b mb-3">
                <Checkbox
                  checked={selectedIds.length === filteredNotifications.length && filteredNotifications.length > 0}
                  onCheckedChange={selectAll}
                />
                <span className="text-sm text-muted-foreground">
                  {selectedIds.length > 0 ? `${selectedIds.length} selected` : 'Select all'}
                </span>
              </div>

              <ScrollArea className="h-[500px]">
                <div className="space-y-2">
                  {filteredNotifications.length === 0 ? (
                    <div className="text-center py-12">
                      <Bell className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                      <h3 className="font-medium text-lg">No notifications</h3>
                      <p className="text-sm text-muted-foreground">You're all caught up!</p>
                    </div>
                  ) : (
                    filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`flex items-start gap-3 p-4 rounded-lg border transition-colors hover:bg-muted/50 ${
                          !notification.read ? 'bg-muted/30 border-primary/20' : ''
                        }`}
                      >
                        <Checkbox
                          checked={selectedIds.includes(notification.id)}
                          onCheckedChange={() => toggleSelect(notification.id)}
                        />
                        <div className="mt-0.5">{getTypeIcon(notification.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {notification.title}
                            </h4>
                            <Badge variant="outline" className={`text-[10px] ${getCategoryBadgeColor(notification.category)}`}>
                              {getCategoryIcon(notification.category)}
                              <span className="ml-1 capitalize">{notification.category}</span>
                            </Badge>
                            {!notification.read && <span className="h-2 w-2 rounded-full bg-primary" />}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">{notification.message}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {notification.timestamp}
                            </span>
                            {notification.actionUrl && (
                              <Button
                                variant="link"
                                size="sm"
                                className="h-auto p-0 text-xs"
                                onClick={() => {
                                  markAsRead(notification.id);
                                  navigate(notification.actionUrl!);
                                }}
                              >
                                {notification.actionLabel}
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleStar(notification.id)}>
                            {notification.starred ? (
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            ) : (
                              <StarOff className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                <CheckCheck className="h-4 w-4 mr-2" /> Mark as read
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toggleStar(notification.id)}>
                                <Star className="h-4 w-4 mr-2" /> {notification.starred ? 'Unstar' : 'Star'}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600" onClick={() => deleteNotification(notification.id)}>
                                <Trash2 className="h-4 w-4 mr-2" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}