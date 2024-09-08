import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

interface IFilterSidebar { }

const FilterSidebar: React.FC<IFilterSidebar> = () => {
    const router = useRouter();
    const [refresh, setRefresh] = useState<boolean>(false);
    const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string | number | string[]>>({});

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const attributes: Record<string, string | number | string[]> = {};
        searchParams.forEach((value, key) => {
            if (key === "ownerType") {
                attributes[key] = value.split(","); // Handle multiple owner types
            } else {
                attributes[key] = value;
            }
        });
        setSelectedAttributes(attributes);
    }, []);

    const handleFilterChange = (filterType: string, value: any) => {
        const searchParams = new URLSearchParams(window.location.search);

        if (filterType === "ownerType") {
            const currentOwnerTypes = selectedAttributes.ownerType as string[] || [];
            const updatedOwnerTypes = value
                ? currentOwnerTypes.includes(value)
                    ? currentOwnerTypes.filter((type) => type !== value) // Remove if already selected
                    : [...currentOwnerTypes, value] // Add if not selected
                : [];

            if (updatedOwnerTypes.length > 0) {
                searchParams.set(filterType, updatedOwnerTypes.join(","));
            } else {
                searchParams.delete(filterType);
            }

            setSelectedAttributes((prev) => ({
                ...prev,
                [filterType]: updatedOwnerTypes,
            }));
        } else {
            if (value) {
                searchParams.set(filterType, value);
            } else {
                searchParams.delete(filterType);
            }

            setSelectedAttributes((prev) => {
                const updated = { ...prev };
                if (value) {
                    updated[filterType] = value;
                } else {
                    delete updated[filterType];
                }
                return updated;
            });
        }

        router.push(`${window.location.pathname}?${searchParams.toString()}`);
    };

    const handleReset = () => {
        setSelectedAttributes({}); // Clear all selected attributes
        router.push(window.location.pathname); // Reset URL to base path without any search parameters
        setRefresh((prev) => !prev); // Reset dropdown values.
    };

    const fetchProduct = () => {
        const payload: { [key: string]: any } = {};
        Object.entries(selectedAttributes).forEach(([key, value]) => {
            payload[key] = value;
        });
        console.log('payload: ', payload);
    };

    useEffect(() => {
        fetchProduct();
    }, [selectedAttributes]);

    return (
        <div className="space-y-6" key={String(refresh)} >
            <div>
                <Label className="mb-3" htmlFor="brand">Brand</Label>
                <Select 
                    onValueChange={(value) => handleFilterChange('brand', value)}
                    value={selectedAttributes['brand'] ? String(selectedAttributes['brand']) : undefined}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Exide">Exide</SelectItem>
                        <SelectItem value="Luminous">Luminous</SelectItem>
                        <SelectItem value="Nexus Solar Energy">Nexus Solar Energy</SelectItem>
                        <SelectItem value="Havells">Havells</SelectItem>
                        <SelectItem value="Kirloskar">Kirloskar</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label className="mb-3" htmlFor="type">Vehicle Type</Label>
                <Select
                    onValueChange={(value) => handleFilterChange('type', value)}
                    value={selectedAttributes['type'] ? String(selectedAttributes['type']) : undefined}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Old">Old</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label className="mb-3" htmlFor="budget">Budget</Label>
                <Select
                    onValueChange={(value) => handleFilterChange('budget', value)}
                    value={selectedAttributes['budget'] ? String(selectedAttributes['budget']) : undefined}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label className="mb-3 mt-6" htmlFor="owner-type">Owner Type</Label>
                <div className="space-y-2">
                <div className="space-y-2">
                    <Checkbox
                        checked={(selectedAttributes['ownerType'] as string[])?.includes('1st')}
                        onCheckedChange={(checked) => handleFilterChange('ownerType', checked ? '1st' : undefined)}>
                        1st
                    </Checkbox>
                    <Checkbox
                        checked={(selectedAttributes['ownerType'] as string[])?.includes('2nd')}
                        onCheckedChange={(checked) => handleFilterChange('ownerType', checked ? '2nd' : undefined)}>
                        2nd
                    </Checkbox>
                    <Checkbox
                        checked={(selectedAttributes['ownerType'] as string[])?.includes('More than 2')}
                        onCheckedChange={(checked) => handleFilterChange('ownerType', checked ? 'More than 2' : undefined)}>
                        More than 2
                    </Checkbox>
                </div>
                </div>
            </div>
            <Button
                color="primary"
                className="w-full"
                onClick={handleReset}
            >
                <Icon icon="heroicons:arrow-path" className="w-4 h-4 me-1.5" />
                Reset
            </Button>
        </div>
    );
};

export default FilterSidebar;
