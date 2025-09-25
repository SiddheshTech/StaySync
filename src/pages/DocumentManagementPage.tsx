import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BrandBar from '@/components/BrandBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ArrowLeft,
  Upload,
  Download,
  Eye,
  Trash2,
  Edit,
  FileText,
  Image,
  File,
  Search,
  Filter,
  SortAsc,
  Grid,
  List,
  Plus,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Shield,
  Lock,
  Unlock,
  Share2,
  Copy,
  Archive,
  RefreshCw,
  Settings,
  Folder,
  FolderOpen,
  FileImage,
  FilePdf,
  FileSpreadsheet,
  FileVideo,
  FileAudio,
  FileArchive,
  FileCode,
  FileCheck,
  FileX,
  FilePlus,
  FileMinus,
  FileEdit,
  FileSearch,
  FileSlash,
  FileUp,
  FileDown,
  FileLeft,
  FileRight,
  FileBarChart,
  FilePieChart,
  FileText2,
  FileType,
  FileQuestion,
  FileWarning,
  FileInfo,
  FileHeart,
  FileStar,
  FileZap,
  FileLock,
  FileUnlock,
  FileShield,
  FileKey,
  FileUser,
  FileUsers,
  FileCalendar,
  FileClock,
  FileTag,
  FileBookmark,
  FileBookmarkCheck,
  FileBookmarkX,
  FileBookmarkPlus,
  FileBookmarkMinus,
  FileBookmarkEdit,
  FileBookmarkSearch,
  FileBookmarkSlash,
  FileBookmarkUp,
  FileBookmarkDown,
  FileBookmarkLeft,
  FileBookmarkRight,
  FileBookmarkBarChart,
  FileBookmarkPieChart,
  FileBookmarkText,
  FileBookmarkType,
  FileBookmarkQuestion,
  FileBookmarkWarning,
  FileBookmarkInfo,
  FileBookmarkHeart,
  FileBookmarkStar,
  FileBookmarkZap,
  FileBookmarkLock,
  FileBookmarkUnlock,
  FileBookmarkShield,
  FileBookmarkKey,
  FileBookmarkUser,
  FileBookmarkUsers,
  FileBookmarkCalendar,
  FileBookmarkClock,
  FileBookmarkTag
} from 'lucide-react';

const DocumentManagementPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedDocuments, setSelectedDocuments] = useState<number[]>([]);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [previewDocument, setPreviewDocument] = useState<any>(null);

  // Mock documents data
  const documents = [
    {
      id: 1,
      name: 'ID Verification - Driver License',
      type: 'PDF',
      size: '2.3 MB',
      status: 'approved',
      uploaded: '2024-01-15',
      application: 'Downtown Studio Apartment',
      category: 'Identity',
      description: 'Front and back of driver license',
      tags: ['ID', 'Verification', 'Government'],
      version: '1.0',
      lastModified: '2024-01-15 14:30',
      uploadedBy: 'You',
      reviewedBy: 'Property Management Co.',
      reviewDate: '2024-01-16 09:15',
      downloadCount: 3,
      isEncrypted: true,
      isShared: false,
      sharedWith: [],
      folder: 'Identity Documents',
      checksum: 'a1b2c3d4e5f6',
      expiryDate: '2025-01-15',
      isRequired: true,
      isExpired: false,
      daysUntilExpiry: 365
    },
    {
      id: 2,
      name: 'Financial Statement - Bank Records',
      type: 'PDF',
      size: '1.8 MB',
      status: 'approved',
      uploaded: '2024-01-15',
      application: 'Downtown Studio Apartment',
      category: 'Financial',
      description: 'Last 3 months of bank statements',
      tags: ['Financial', 'Bank', 'Statements'],
      version: '1.0',
      lastModified: '2024-01-15 16:45',
      uploadedBy: 'You',
      reviewedBy: 'Property Management Co.',
      reviewDate: '2024-01-16 10:30',
      downloadCount: 1,
      isEncrypted: true,
      isShared: false,
      sharedWith: [],
      folder: 'Financial Documents',
      checksum: 'b2c3d4e5f6a1',
      expiryDate: '2024-04-15',
      isRequired: true,
      isExpired: false,
      daysUntilExpiry: 90
    },
    {
      id: 3,
      name: 'Enrollment Proof - University',
      type: 'PDF',
      size: '1.2 MB',
      status: 'pending',
      uploaded: '2024-01-16',
      application: 'Downtown Studio Apartment',
      category: 'Academic',
      description: 'Current semester enrollment verification',
      tags: ['Academic', 'University', 'Enrollment'],
      version: '1.0',
      lastModified: '2024-01-16 09:15',
      uploadedBy: 'You',
      reviewedBy: null,
      reviewDate: null,
      downloadCount: 0,
      isEncrypted: false,
      isShared: false,
      sharedWith: [],
      folder: 'Academic Documents',
      checksum: 'c3d4e5f6a1b2',
      expiryDate: '2024-12-31',
      isRequired: true,
      isExpired: false,
      daysUntilExpiry: 300
    },
    {
      id: 4,
      name: 'Reference Letter - Professor',
      type: 'PDF',
      size: '0.9 MB',
      status: 'rejected',
      uploaded: '2024-01-17',
      application: 'Downtown Studio Apartment',
      category: 'Reference',
      description: 'Academic reference from professor',
      tags: ['Reference', 'Academic', 'Professor'],
      version: '1.0',
      lastModified: '2024-01-17 11:20',
      uploadedBy: 'You',
      reviewedBy: 'Property Management Co.',
      reviewDate: '2024-01-18 14:15',
      downloadCount: 2,
      isEncrypted: false,
      isShared: false,
      sharedWith: [],
      folder: 'Reference Documents',
      checksum: 'd4e5f6a1b2c3',
      expiryDate: '2024-06-17',
      isRequired: false,
      isExpired: false,
      daysUntilExpiry: 150,
      rejectionReason: 'Letter is not on official letterhead'
    },
    {
      id: 5,
      name: 'Photo - Profile Picture',
      type: 'JPG',
      size: '0.5 MB',
      status: 'approved',
      uploaded: '2024-01-15',
      application: 'Downtown Studio Apartment',
      category: 'Profile',
      description: 'Professional headshot for profile',
      tags: ['Photo', 'Profile', 'Picture'],
      version: '1.0',
      lastModified: '2024-01-15 13:45',
      uploadedBy: 'You',
      reviewedBy: 'Property Management Co.',
      reviewDate: '2024-01-16 08:30',
      downloadCount: 5,
      isEncrypted: false,
      isShared: true,
      sharedWith: ['Property Management Co.'],
      folder: 'Profile Documents',
      checksum: 'e5f6a1b2c3d4',
      expiryDate: null,
      isRequired: false,
      isExpired: false,
      daysUntilExpiry: null
    }
  ];

  const categories = [
    { name: 'Identity', count: 1, color: 'bg-blue-100 text-blue-800' },
    { name: 'Financial', count: 1, color: 'bg-green-100 text-green-800' },
    { name: 'Academic', count: 1, color: 'bg-purple-100 text-purple-800' },
    { name: 'Reference', count: 1, color: 'bg-orange-100 text-orange-800' },
    { name: 'Profile', count: 1, color: 'bg-pink-100 text-pink-800' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="default" className="bg-green-500">Approved</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FilePdf className="w-5 h-5 text-red-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <FileImage className="w-5 h-5 text-blue-500" />;
      case 'doc':
      case 'docx':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'xls':
      case 'xlsx':
        return <FileSpreadsheet className="w-5 h-5 text-green-500" />;
      default:
        return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleSelectDocument = (id: number) => {
    setSelectedDocuments(prev => 
      prev.includes(id) 
        ? prev.filter(docId => docId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedDocuments.length === documents.length) {
      setSelectedDocuments([]);
    } else {
      setSelectedDocuments(documents.map(doc => doc.id));
    }
  };

  const handlePreview = (document: any) => {
    setPreviewDocument(document);
    setShowPreviewDialog(true);
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    const matchesType = filterType === 'all' || doc.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <BrandBar badgeText="Document Management" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="sm" onClick={() => navigate('/applications')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Applications
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">Document Management</h1>
            <p className="text-muted-foreground">Upload, organize, and manage your application documents</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button onClick={() => setShowUploadDialog(true)}>
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Documents</p>
                  <p className="text-2xl font-bold text-primary">{documents.length}</p>
                </div>
                <FileText className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold text-green-500">{documents.filter(d => d.status === 'approved').length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-orange-500">{documents.filter(d => d.status === 'pending').length}</p>
                </div>
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Storage Used</p>
                  <p className="text-2xl font-bold text-blue-500">6.7 MB</p>
                </div>
                <FileUp className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 gap-4 items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
              <select 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">All Types</option>
                <option value="pdf">PDF</option>
                <option value="jpg">JPG</option>
                <option value="png">PNG</option>
                <option value="doc">DOC</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <SortAsc className="w-4 h-4 mr-2" />
                Sort
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Categories Sidebar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Categories</CardTitle>
              <CardDescription>Organize by document type</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Folder className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                  <Badge variant="secondary" className={category.color}>
                    {category.count}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Documents Grid/List */}
          <div className="lg:col-span-3">
            {/* Bulk Actions */}
            {selectedDocuments.length > 0 && (
              <Card className="p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      checked={selectedDocuments.length === documents.length}
                      onCheckedChange={handleSelectAll}
                    />
                    <span className="text-sm font-medium">
                      {selectedDocuments.length} document{selectedDocuments.length !== 1 ? 's' : ''} selected
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <Archive className="w-4 h-4 mr-2" />
                      Archive
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Documents Display */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredDocuments.map((document) => (
                  <Card key={document.id} className="card-hover group">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Checkbox 
                            checked={selectedDocuments.includes(document.id)}
                            onCheckedChange={() => handleSelectDocument(document.id)}
                          />
                          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            {getFileIcon(document.type)}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {getStatusBadge(document.status)}
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium text-sm line-clamp-2">{document.name}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">{document.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{document.type}</span>
                          <span>•</span>
                          <span>{document.size}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Uploaded</span>
                          <span>{new Date(document.uploaded).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Application</span>
                          <span className="truncate ml-2">{document.application}</span>
                        </div>
                        {document.isRequired && (
                          <div className="flex items-center gap-1 text-xs text-orange-600">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Required Document</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handlePreview(document)}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredDocuments.map((document) => (
                  <Card key={document.id} className="card-hover">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <Checkbox 
                          checked={selectedDocuments.includes(document.id)}
                          onCheckedChange={() => handleSelectDocument(document.id)}
                        />
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          {getFileIcon(document.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm truncate">{document.name}</h4>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(document.status)}
                              <span className="text-xs text-muted-foreground">{document.size}</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{document.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                            <span>Uploaded {new Date(document.uploaded).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{document.application}</span>
                            <span>•</span>
                            <span>{document.downloadCount} downloads</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" onClick={() => handlePreview(document)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Upload Dialog */}
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
              <DialogDescription>Upload a new document for your application</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Document Type</Label>
                <select className="w-full p-2 border rounded-md">
                  <option>Identity Verification</option>
                  <option>Financial Statement</option>
                  <option>Academic Records</option>
                  <option>Reference Letter</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <Label>Select File</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop your file here, or click to browse
                  </p>
                  <Input type="file" className="max-w-xs mx-auto" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB)
                  </p>
                </div>
              </div>
              <div>
                <Label>Description (Optional)</Label>
                <Textarea placeholder="Add a description for this document..." rows={3} />
              </div>
              <div>
                <Label>Tags (Optional)</Label>
                <Input placeholder="Enter tags separated by commas..." />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="encrypt" />
                <Label htmlFor="encrypt" className="text-sm">
                  Encrypt document for additional security
                </Label>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowUploadDialog(false)}>
                Upload Document
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Preview Dialog */}
        <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
          <DialogContent className="max-w-4xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>{previewDocument?.name}</DialogTitle>
              <DialogDescription>Document preview and details</DialogDescription>
            </DialogHeader>
            {previewDocument && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <FileText className="w-16 h-16 text-muted-foreground" />
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold">Document Information</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Type:</span>
                          <span>{previewDocument.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Size:</span>
                          <span>{previewDocument.size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          {getStatusBadge(previewDocument.status)}
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Uploaded:</span>
                          <span>{new Date(previewDocument.uploaded).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Downloads:</span>
                          <span>{previewDocument.downloadCount}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Description</h4>
                      <p className="text-sm text-muted-foreground">{previewDocument.description}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Tags</h4>
                      <div className="flex flex-wrap gap-1">
                        {previewDocument.tags.map((tag: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DocumentManagementPage;
