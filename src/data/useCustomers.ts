import { useEffect, useState, useCallback } from "react";
import { graphqlRequest } from "../lib/graphqlClient";
import { ListZellerCustomers } from "../graphql/queries";

// The returned shape of a customer record
export type Customer = {
    email: string;
    id: string;
    name: string;
    role: "ADMIN" | "MANAGER";
};

// Expected response shape from the GraphQL API
type ListResponse = {
    listZellerCustomers: {
        items: Customer[];
    };
};

const useCustomers = () => {
    const [customers, setCustomers] = useState<Customer[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch function — memoized to avoid re-creation between renders
    const fetchCustomers = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
            // call upon GraphQL request using the given query
            const data = await graphqlRequest({ query: ListZellerCustomers }) as ListResponse;
            const items = data?.listZellerCustomers?.items ?? [];

            // Store fetched results
            setCustomers(items);
            setLoading(false);
        } catch (error) {
            setError((error as Error).message);
            setCustomers(null);
        } finally {
            setLoading(false);
        }

    } , []);

    // Run on mount to trigger initial fetch
    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

    return { customers, loading, error, refetch: fetchCustomers };
}

export default useCustomers;

