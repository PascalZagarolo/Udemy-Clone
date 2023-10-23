'use client'

import { useSearchParams } from "next/navigation";

export const getSearchParams = () => {
    const searchParams = useSearchParams();
    const filterOption = searchParams.get("commentFilter");

    return filterOption;
}