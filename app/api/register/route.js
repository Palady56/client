import { NextResponse } from "next/server";

export async function GET(req) {
    const token = req.nextUrl.searchParams.get('tkey')

    if (token === null || token === '') {
        return NextResponse.redirect(`${process.env.APP_URL}/auth/register`)
    }

    const res = await fetch(`${process.env.URL_INTERNAL}/back/api/v1/register/confirm?tkey=${token}`)

    if (res.status >= 400) {
        return NextResponse.redirect(`${process.env.APP_URL}/auth/register`)
    }

    return NextResponse.redirect(`${process.env.APP_URL}/auth/login`)
}
