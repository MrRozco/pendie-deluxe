import { ButtonLink, Label } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-lux flex flex-col items-start gap-8">
        <Label rule>404</Label>
        <h1 className="display-2">
          This room does not <em className="gold-italic">exist.</em>
        </h1>
        <p className="prose-lux max-w-[520px]">The page you are looking for has moved or never existed.</p>
        <ButtonLink href="/" arrow>Return Home</ButtonLink>
      </div>
    </section>
  );
}
