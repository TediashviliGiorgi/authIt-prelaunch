import { Brand } from '@/types/brand';
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
import { MoreVertical, Edit, Archive, Trash2, Eye, Wine } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BrandCardProps {
  brand: Brand;
  onEdit?: (brand: Brand) => void;
  onArchive?: (brand: Brand) => void;
  onDelete?: (brand: Brand) => void;
}

export const BrandCard = ({ brand, onEdit, onArchive, onDelete }: BrandCardProps) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/dashboard/brands/${brand.id}`);
  };

  const handleViewProducts = () => {
    navigate(`/dashboard/products?brandId=${brand.id}`);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          {brand.logoUrl ? (
            <img 
              src={brand.logoUrl} 
              alt={brand.name}
              className="h-12 w-12 rounded-lg object-cover border"
            />
          ) : (
            <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
              <Wine className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
          <div>
            <CardTitle className="text-lg">{brand.name}</CardTitle>
            {brand.code && (
              <CardDescription className="text-xs font-mono">
                {brand.code}
              </CardDescription>
            )}
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
            <DropdownMenuItem onClick={handleViewProducts}>
              <Wine className="mr-2 h-4 w-4" />
              View Products ({brand.productCount})
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {onEdit && (
              <DropdownMenuItem onClick={() => onEdit(brand)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
            )}
            {onArchive && brand.status === 'active' && (
              <DropdownMenuItem onClick={() => onArchive(brand)}>
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </DropdownMenuItem>
            )}
            {onDelete && (
              <DropdownMenuItem 
                onClick={() => onDelete(brand)}
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
        {brand.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {brand.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant={brand.status === 'active' ? 'default' : 'secondary'}>
              {brand.status}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {brand.productCount} {brand.productCount === 1 ? 'product' : 'products'}
            </span>
          </div>

          <Button variant="outline" size="sm" onClick={handleView}>
            <Eye className="mr-2 h-3 w-3" />
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};