"use client";
import { useContext } from "react";
import { SearchContext } from "@/context/search";

export const useSearch = () => useContext(SearchContext);