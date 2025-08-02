type SuccessMessageProps = { sent: boolean | null };

export default function SuccessMessage({ sent }: SuccessMessageProps) {
  if (sent === null) return null;
  return (
    <div className="flex flex-col absolute bottom-10 right-10 items-center justify-center bg-green-700 bg-opacity-50 p-4 rounded-md text-white">
      {sent && (
        <div id="success-message">
          <h1>Check your email. Email should be send. ✔️</h1>
        </div>
      )}
    </div>
  );
}