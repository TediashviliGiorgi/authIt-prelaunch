import { Product } from '@/types/product';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  MoreVertical, 
  Edit, 
  Archive, 
  Trash2, 
  Eye, 
  Wine,
  Plus,
  QrCode,
  Shield,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onArchive?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

export const ProductCard = ({ product, onEdit, onArchive, onDelete }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/dashboard/products/${product.id}`);
  };

  const handleCreateBatch = () => {
    navigate(`/dashboard/batches/create?productId=${product.id}`);
  };

  // Format category for display
  const formatCategory = (category: string) => {
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          {product.thumbnailUrl || product.imageUrl ? (
            <img 
              src={product.thumbnailUrl || product.imageUrl} 
              alt={product.name}
              className="h-14 w-14 rounded-lg object-cover border"
            />
          ) : (
            <div className="h-14 w-14 rounded-lg bg-muted flex items-center justify-center">
              <Wine className="h-7 w-7 text-muted-foreground" />
            </div>
          )}
          <div>
            <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
            <CardDescription className="text-xs font-mono">
              {product.sku}
            </CardDescription>
            <p className="text-xs text-muted-foreground mt-0.5">
              {product.brandName}
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleView}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleCreateBatch}>
              <Plus className="mr-2 h-4 w-4" />
              Create Batch
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {onEdit && (
              <DropdownMenuItem onClick={() => onEdit(product)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
            )}
            {onArchive && product.status === 'active' && (
              <DropdownMenuItem onClick={() => onArchive(product)}>
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </DropdownMenuItem>
            )}
            {onDelete && (
              <DropdownMenuItem 
                onClick={() => onDelete(product)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent>
        {/* Category and Vintage */}
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline">
            {formatCategory(product.category)}
          </Badge>
          {product.vintageYear && (
            <Badge variant="secondary">
              {product.vintageYear}
            </Badge>
          )}
          {product.volumeML && (
            <span className="text-xs text-muted-foreground">
              {product.volumeML}ml
            </span>
          )}
        </div>

        {/* Description */}
        {product.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {product.description}
          </p>
        )}

        {/* QR Features */}
        <div className="flex items-center gap-2 mb-3">
          {product.qrConfiguration?.dualQREnabled && (
            <Badge variant="default" className="gap-1">
              <Shield className="h-3 w-3" />
              Dual QR
            </Badge>
          )}
          {product.qrConfiguration?.digitalPassportEnabled && (
            <Badge variant="secondary" className="gap-1">
              <QrCode className="h-3 w-3" />
              Passport
            </Badge>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
              {product.status}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {product.batchCount} {product.batchCount === 1 ? 'batch' : 'batches'}
            </span>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCreateBatch}>
              <Plus className="mr-1 h-3 w-3" />
              Batch
            </Button>
            <Button variant="ghost" size="sm" onClick={handleView}>
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};