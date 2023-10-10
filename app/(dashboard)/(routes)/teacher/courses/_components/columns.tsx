"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Course } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, BadgeEuro, EuroIcon, MoreHorizontal, PencilIcon, icons } from 'lucide-react';
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
        return (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Titel
                <ArrowUpDown className ="ml-2 h-4 w-4"/>
            </Button>
        )
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
        return (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Preis <BadgeEuro className="ml-2 h-3 w-3 text-grey-800" />
                <ArrowUpDown className ="ml-2 h-4 w-4"/>
            </Button>
        )
    },
    cell : ({ row }) => {
      const value = row.original.price;

      return(
        <span>
          {value && (
            <span className="text-medium font-semibold">
              {value} €
            </span>
          )}
          {!value && (
            <span className="text-sm  text-slate-800/80">
              Noch keinen Preis festgelegt
            </span>
          )}
        </span>
      )
    }
  }, 
  {
accessorKey: "isPublished",
   header: ({ column }) => {
        return (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Sichtbarkeit
                <ArrowUpDown className ="ml-2 h-4 w-4"/>
            </Button>
        )
    },
    cell: ({ row }) => {
      const { isPublished } = row.original;
    
      return (
        <Badge className={cn("bg-blue-700/90", isPublished && "bg-gray-900/90")}>
          {isPublished ? "Veröffentlicht" : "Privat"}
        </Badge>
      )
    }
  },
  {
    id : "actions",
    cell : ({ row }) => {
      const { id } = row.original;

      return(
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-8 p-0">
              <span className="sr-only"> Menu öffnen </span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/teacher/courses/${id}`}>
              <DropdownMenuItem>
                <PencilIcon className="h-4 w-4 mr-2"/>
                  Bearbeiten
               
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
