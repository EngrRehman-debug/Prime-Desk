import Button from "@/components/ui/Button";
import styles from "./NotifyForm.module.css";

export default function NotifyForm({ placeholder, buttonLabel }: { placeholder: string; buttonLabel: string }) {
  return (
    <form className={styles.form} action="#">
      <input type="email" name="email" aria-label="Email" required placeholder={placeholder} />
      <Button as="button" label={buttonLabel} />
    </form>
  );
}
