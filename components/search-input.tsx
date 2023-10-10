'use client';

import { SearchCheckIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import qs from "query-string"

const SearchInput = () => {

    const [value, setValue] = useState("");
    const debouncedValue = useDebounce(value);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentCategoryId = searchParams.get("categoryId");

    useEffect(() => {

        const url = qs.stringifyUrl({
            url : pathname,
            query : {
                categoryId : currentCategoryId,
                title : debouncedValue
            }
        }, { skipEmptyString : true, skipNull : true})
        
        router.push(url)
    },[debouncedValue, currentCategoryId, router , pathname])
    

    return ( 
        <div className="relative">
            <SearchCheckIcon className="h-4 w-4 absolute top-3 left-4 text-late-600"/>
            <Input 
            className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
            placeholder="Suche nach einem Kurs..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            />
        </div>
     );
}
 
export default SearchInput;