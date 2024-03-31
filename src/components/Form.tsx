import { FormEvent, FormHTMLAttributes, PropsWithChildren } from 'react';

interface IForm extends PropsWithChildren, FormHTMLAttributes<HTMLFormElement> {
  isStopPropagation?: boolean;
}
const Form = ({ isStopPropagation, children, ...formAttributes }: IForm) => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isStopPropagation) e.stopPropagation();

    if (formAttributes.onSubmit) formAttributes.onSubmit(e);
  };

  return (
    <form {...formAttributes} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
