export default function ResponseTable({ responses }: { responses: any[] }) {
    console.log(responses)
    return (
        <div className="space-y-4">
            {responses.map((response) => (
                <div key={response.id}>
                    <h3 className="text-sm font-semibold mb-2">{response.question.question}</h3>
                    <p>{response.response}</p>
                </div>
            ))}
        </div>
    )
}
