import * as Yup from 'yup';

export const SearchFormSchema = Yup.object().shape({
  search:
    Yup.string()
    .required('Required'),
});
