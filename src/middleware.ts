import {NextRequest, NextResponse} from 'next/server';

export async function middleware(req: NextRequest) {

    const url = req.nextUrl.clone();
    const pathName = url.pathname;

    if (req.headers.get('x-skip-redirect') === 'true') {
        return NextResponse.next();
    }

    if (pathName.startsWith('/_next') || pathName.startsWith('/static')) {
        return NextResponse.next();
    }

    const userWithToken = req.cookies.get('authUser');
    const authUser = userWithToken?.value ? JSON.parse(userWithToken.value) : null;



    if (!authUser && !req.nextUrl.pathname.startsWith('/login') && !req.nextUrl.pathname.startsWith('/')) {
        if (!req.nextUrl.pathname.startsWith('/api')) {
            url.pathname = '/login';
            const response = NextResponse.redirect(new URL('/login', req.nextUrl.origin));
            response.headers.set('Cache-Control', 'no-store');
            response.headers.set('Refresh', '0');
            return response;
        }

    }

    if (authUser && req.method === 'GET' && pathName.startsWith('/api')) {
        const token = authUser.accessToken;
        const requestHeaders = new Headers(req.headers);
        requestHeaders.set('Authorization', `Bearer ${token}`);

        return NextResponse.next({request: {headers: requestHeaders}});
    }
}

