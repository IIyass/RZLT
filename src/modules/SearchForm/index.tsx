import { Formik, Form, FormikHelpers } from 'formik';
import { Box, Button, Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import Input from 'components/Input';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLoading,
  selectSearchStep,
  setSearchTerm,
} from 'state/user/slice';
import { SearchFormSchema } from './validationSchema';
import { SearchStep } from 'types';

interface Values {
  search: string;
}

interface Props {
  search?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      width: '100%',
      backgroundColor: theme.palette.secondary.main,
      '& h1': {
        color: theme.palette.primary.main,
        textAlign: 'center',
        marginBottom: '30px',
        marginTop: '0px',
      },
      '& form': {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px',
      },

      '& button[type=submit]': {
        marginTop: '25px',
        width: '100%',
      },
    },
    homeAddress: {
      display: 'flex',
    },
  })
);

const SearchForm = (props: Props) => {
  const classes = useStyles();
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const searchStep = useSelector(selectSearchStep);

  return (
    <Box className={classes.box}>
      <Formik
        enableReinitialize
        initialValues={{
          search: props.search || '',
        }}
        validationSchema={SearchFormSchema}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          const { search } = values;
          dispatch(setSearchTerm(search));
          setSubmitting(false);
        }}
      >
        {({
          errors,
          touched,
          values,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form>
            <Input
              id="search"
              label="Github username"
              type="search"
              error={errors.search}
              touched={touched.search}
              value={values.search}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {searchStep === SearchStep.USER && (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
                onClick={() => {
                  handleSubmit();
                }}
              >
                Search
              </Button>
            )}
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SearchForm;
