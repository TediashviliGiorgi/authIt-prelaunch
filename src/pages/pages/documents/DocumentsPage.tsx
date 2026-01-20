import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  FileText, Upload, Download, Search, Filter, FolderOpen, FileCheck, FileClock, FileX,
  FlaskConical, Award, FileSpreadsheet, MoreVertical, Eye, Trash2, Share2,
  Clock, CheckCircle, AlertTriangle, XCircle, Calendar, Building2, Wine,
} from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Document, DocumentStatus, DocumentCategory } from '@/types/document';

// ==========================================
// MOCK DATA
// ==========================================
const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Chemical Analysis Report - Saperavi 2021',
    category: 'lab-reports',
    status: 'verified',
    uploadDate: '2026-01-08',
    size: '2.4 MB',
    uploadedBy: 'Georgian Wine Lab',
    productName: 'Saperavi Reserve 2021',
    batchId: 'B-2024-0892',
    labName: 'Georgian National Wine Laboratory',
    description: 'Full chemical analysis including alcohol content, acidity, residual sugar.',
  },
  {
    id: '2',
    name: 'PDO Certificate - Kakheti Region',
    category: 'certificates',
    status: 'verified',
    uploadDate: '2026-01-05',
    expiryDate: '2027-01-05',
    size: '1.1 MB',
    uploadedBy: 'Wine Agency',
    productName: 'Saperavi Reserve 2021',
    description: 'Protected Designation of Origin certificate for Kakheti wines.',
  },
  {
    id: '3',
    name: 'Organic Certification 2026',
    category: 'certificates',
    status: 'pending',
    uploadDate: '2026-01-10',
    expiryDate: '2027-01-10',
    size: '890 KB',
    uploadedBy: 'Eco Cert Georgia',
    description: 'Annual organic certification renewal - awaiting verification.',
  },
  {
    id: '4',
    name: 'Microbiological Test Results',
    category: 'lab-reports',
    status: 'verified',
    uploadDate: '2026-01-03',
    size: '1.8 MB',
    uploadedBy: 'BioLab Tbilisi',
    productName: 'Rkatsiteli Qvevri 2020',
    batchId: 'B-2024-0856',
    labName: 'BioLab Tbilisi',
  },
  {
    id: '5',
    name: 'Export License - EU Markets',
    category: 'certificates',
    status: 'expired',
    uploadDate: '2025-01-15',
    expiryDate: '2026-01-15',
    size: '450 KB',
    uploadedBy: 'Ministry of Agriculture',
    description: 'Export license expired - renewal required.',
  },
  {
    id: '6',
    name: 'Internal Quality Control Report Q4',
    category: 'internal',
    status: 'verified',
    uploadDate: '2026-01-02',
    size: '3.2 MB',
    uploadedBy: 'Quality Manager',
    description: 'Quarterly internal quality control and compliance report.',
  },
  {
    id: '7',
    name: 'DPP Data Package - Batch B-2024-0892',
    category: 'dpp',
    status: 'verified',
    uploadDate: '2026-01-08',
    size: '5.6 MB',
    uploadedBy: 'System',
    batchId: 'B-2024-0892',
    productName: 'Saperavi Reserve 2021',
    description: 'Complete Digital Product Passport data package for consumer transparency.',
  },
  {
    id: '8',
    name: 'Sulfite Analysis Report',
    category: 'lab-reports',
    status: 'rejected',
    uploadDate: '2026-01-07',
    size: '1.2 MB',
    uploadedBy: 'External Lab',
    labName: 'Unknown Lab',
    description: 'Rejected - Lab not in approved laboratory list.',
  },
];

// ==========================================
// HELPER FUNCTIONS
// ==========================================
const getStatusIcon = (status: DocumentStatus) => {
  switch (status) {
    case 'verified': return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
    case 'rejected': return <XCircle className="h-4 w-4 text-red-500" />;
    case 'expired': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
  }
};

const getStatusBadge = (status: DocumentStatus) => {
  const styles = {
    verified: 'bg-green-500/10 text-green-600 border-green-500/30',
    pending: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30',
    rejected: 'bg-red-500/10 text-red-600 border-red-500/30',
    expired: 'bg-orange-500/10 text-orange-600 border-orange-500/30',
  };
  return styles[status];
};

const getCategoryIcon = (category: DocumentCategory) => {
  switch (category) {
    case 'lab-reports': return <FlaskConical className="h-4 w-4 text-blue-500" />;
    case 'certificates': return <Award className="h-4 w-4 text-purple-500" />;
    case 'internal': return <FileSpreadsheet className="h-4 w-4 text-gray-500" />;
    case 'dpp': return <FileCheck className="h-4 w-4 text-green-500" />;
    default: return <FileText className="h-4 w-4" />;
  }
};

const getCategoryLabel = (category: DocumentCategory) => {
  switch (category) {
    case 'lab-reports': return 'Lab Report';
    case 'certificates': return 'Certificate';
    case 'internal': return 'Internal';
    case 'dpp': return 'DPP';
    default: return 'Document';
  }
};

// ==========================================
// COMPONENT
// ==========================================
export default function DocumentsPage() {
  const [documents] = useState<Document[]>(mockDocuments);
  const [activeTab, setActiveTab] = useState<DocumentCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Filter documents
  const filteredDocuments = documents.filter((doc) => {
    const matchesTab = activeTab === 'all' || doc.category === activeTab;
    const matchesSearch = searchQuery === '' ||
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.productName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.batchId?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Stats
  const stats = {
    total: documents.length,
    verified: documents.filter((d) => d.status === 'verified').length,
    pending: documents.filter((d) => d.status === 'pending').length,
    expired: documents.filter((d) => d.status === 'expired').length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Documents</h1>
          <p className="text-sm text-muted-foreground">
            Manage lab reports, certificates, and Digital Product Passport documents
          </p>
        </div>
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
              <DialogDescription>
                Upload lab reports, certificates, or internal documents for validation.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Document Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lab-reports">Lab Report</SelectItem>
                    <SelectItem value="certificates">Certificate</SelectItem>
                    <SelectItem value="internal">Internal Document</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Related Product (Optional)</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="saperavi-2021">Saperavi Reserve 2021</SelectItem>
                    <SelectItem value="rkatsiteli-2020">Rkatsiteli Qvevri 2020</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>File</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX up to 10MB</p>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Description (Optional)</Label>
                <Input placeholder="Brief description of the document" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUploadOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsUploadOpen(false)}>
                <Upload className="h-4 w-4 mr-2" /> Upload
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <FolderOpen className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Documents</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <FileCheck className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.verified}</p>
                <p className="text-xs text-muted-foreground">Verified</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/10">
                <FileClock className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.pending}</p>
                <p className="text-xs text-muted-foreground">Pending Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <FileX className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.expired}</p>
                <p className="text-xs text-muted-foreground">Expired</p>
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
                placeholder="Search documents, products, batches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-80"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" /> Filters
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" /> Export List
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as DocumentCategory)}>
            <TabsList className="mb-4">
              <TabsTrigger value="all" className="gap-1">
                <FolderOpen className="h-4 w-4" /> All
                <Badge variant="secondary" className="ml-1 h-5 px-1.5">{documents.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="lab-reports" className="gap-1">
                <FlaskConical className="h-4 w-4" /> Lab Reports
              </TabsTrigger>
              <TabsTrigger value="certificates" className="gap-1">
                <Award className="h-4 w-4" /> Certificates
              </TabsTrigger>
              <TabsTrigger value="internal" className="gap-1">
                <FileSpreadsheet className="h-4 w-4" /> Internal
              </TabsTrigger>
              <TabsTrigger value="dpp" className="gap-1">
                <FileCheck className="h-4 w-4" /> DPP Documents
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <ScrollArea className="h-[500px]">
                <div className="space-y-2">
                  {filteredDocuments.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                      <h3 className="font-medium text-lg">No documents found</h3>
                      <p className="text-sm text-muted-foreground mb-4">Upload your first document to get started.</p>
                      <Button onClick={() => setIsUploadOpen(true)}>
                        <Upload className="h-4 w-4 mr-2" /> Upload Document
                      </Button>
                    </div>
                  ) : (
                    filteredDocuments.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        {/* Icon */}
                        <div className="p-3 rounded-lg bg-muted">
                          {getCategoryIcon(doc.category)}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium truncate">{doc.name}</h4>
                            <Badge variant="outline" className={getStatusBadge(doc.status)}>
                              {getStatusIcon(doc.status)}
                              <span className="ml-1 capitalize">{doc.status}</span>
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" /> {doc.uploadDate}
                            </span>
                            <span>{doc.size}</span>
                            {doc.productName && (
                              <span className="flex items-center gap-1">
                                <Wine className="h-3 w-3" /> {doc.productName}
                              </span>
                            )}
                            {doc.labName && (
                              <span className="flex items-center gap-1">
                                <Building2 className="h-3 w-3" /> {doc.labName}
                              </span>
                            )}
                          </div>
                          {doc.description && (
                            <p className="text-xs text-muted-foreground mt-1 truncate">{doc.description}</p>
                          )}
                        </div>

                        {/* Category Badge */}
                        <Badge variant="secondary" className="shrink-0">
                          {getCategoryIcon(doc.category)}
                          <span className="ml-1">{getCategoryLabel(doc.category)}</span>
                        </Badge>

                        {/* Actions */}
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem><Eye className="h-4 w-4 mr-2" /> View Details</DropdownMenuItem>
                              <DropdownMenuItem><Download className="h-4 w-4 mr-2" /> Download</DropdownMenuItem>
                              <DropdownMenuItem><Share2 className="h-4 w-4 mr-2" /> Share</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
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

      {/* Info Card */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <FileCheck className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Document Validation Process</h4>
              <p className="text-sm text-muted-foreground">
                All uploaded documents undergo automatic validation. Lab reports are verified against
                our approved laboratory list. Certificates are checked for authenticity and expiry dates.
                Verified documents are automatically linked to your Digital Product Passports (DPP).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}