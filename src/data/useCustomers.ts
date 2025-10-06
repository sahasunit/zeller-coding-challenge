import { useEffect, useState, useCallback } from "react";
import { graphqlRequest } from "../lib/graphqlClient";
import { ListZellerCustomers } from "../graphql/queries";

export type Customer = {
    email: string | null;
    id: string;
    name: string;
    role: "Admin" | "Manager" | string;
};

type ListResponse = {
    listZellerCustomers: {
        items: Customer[];
    };
};

export const useCustomers = () => {
    const [customers, setCustomers] = useState<Customer[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCustomers = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
            const data = await graphqlRequest({ query: ListZellerCustomers }) as ListResponse;
            const items = data?.listZellerCustomers?.items ?? [];
            setCustomers(items);
            setLoading(false);
        } catch (error) {
            setError((error as Error).message);
            setCustomers(null);
        } finally {
            setLoading(false);
        }

    } , []);

    useEffect(() => {
        fetchCustomers();
      }, [fetchCustomers]);

    return { customers, loading, error, refetch: fetchCustomers };
}

