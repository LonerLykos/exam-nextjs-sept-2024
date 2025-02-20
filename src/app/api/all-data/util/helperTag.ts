export const helper = (searchParams: URLSearchParams) => {

        const prototype = searchParams.get('type') || '';
        const type = `/${prototype}`;
        const skip = parseInt(searchParams.get('skip') || '0');

        let limit = 0;

        if (prototype === 'users') {
            limit = parseInt(searchParams.get('limit') || '16');
        } else if (prototype === 'recipes') {
            limit = parseInt(searchParams.get('limit') || '4');
        }

        const params = `?limit=${limit}&skip=${skip}`

        return { type, params};

}

