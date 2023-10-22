"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Combo } from 'next/font/google';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const commentOptions = [
    {
        value : "newest",
        label: "neueste"
    }, {
        value : "oldest",
        label : "älteste"
    }, {
        value : "best",
        label : "relevanteste"
    }
]

interface ComboBoxCommentProps {
  onChange : (value : string) => void
}


export const ComboboxComment: React.FC<ComboBoxCommentProps>= ({
onChange
}) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue ] = React.useState("")
  
  

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? commentOptions.find((option) => option.value === value)?.label
            : "Kommentare filtern"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Kategorie suchen.." />
          <CommandEmpty>Kein passender Kurs gefunden</CommandEmpty>
          <CommandGroup>
            {commentOptions.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => {
                  onChange(option.value === value ? "" : option.value)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

