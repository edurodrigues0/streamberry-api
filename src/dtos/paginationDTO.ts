export interface PaginationDTO {
  currentPage: number
  totalItems: number
  totalPages: number
  itemsPerPage: number
  items: any[]
  averageRating: number | null
}