import './styles.css';

type Props = {
  buttonText: string;
}

function Button({ buttonText }: Props) {
  return (
    <button type="submit" name="submit-button" className="submit-button">{buttonText}</button>
  )
}

export default Button