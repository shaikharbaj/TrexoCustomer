
export function getS3BasePath() {
    const url = process.env.AWS_URL;
    if (!url) {
        console.error('Missing AWS_URL');
    }
    return `${url}`;
}
