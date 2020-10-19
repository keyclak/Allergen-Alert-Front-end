import React, { useEffect, useState, useCallback } from 'react';
import { SectionList } from 'react-native';

export function useAsync(asyncFunc) {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    function execute(...args) {
        setLoading(true);
        setResponse(null);
        setError(null);

        return asyncFunc(...args)
            .then(r => {
                setResponse(r)
                return r;
            })
            .catch(e => {
                setError(e);
                throw e;
            })
            .finally(() => setLoading(false));
    }

    function background(...args) {
        execute(...args)
            .then(() => {})
            .catch(() => {});
    }

    return { execute, background, loading, response, error };
}