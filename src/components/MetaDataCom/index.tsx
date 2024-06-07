
"use client"

interface Props {
    seoTitle?: string | any;
    seoDescription?: string;
}

export const MetaDataCom = ({ seoTitle, seoDescription }: Props) => {
    return (
        <>
            <title>{seoTitle}</title>
            <meta name="description" content={seoDescription} />
        </>
    );
}