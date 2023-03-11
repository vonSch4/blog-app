import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { updateArticle } from '../../store/slices/articleSlice';
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner';

import styles from './EditArticleForm.module.scss';

function EditArticleForm() {
  const dispatch = useDispatch();
  const isLoadingCreate = useSelector((state) => state.article.isLoadingCreate);
  const token = useSelector((state) => state.user.user.token);
  const article = useSelector((state) => state.article.article);

  const {
    title: beforeTitle,
    description: beforeDescription,
    body: beforeBody,
    tagList: beforeTags,
    slug,
  } = article;

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      title: beforeTitle,
      description: beforeDescription,
      body: beforeBody,
      tagList: beforeTags.map((tag) => {
        return { tag };
      }),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });

  const tagsList = fields.map((field, index) => {
    return (
      <li className={styles.tag} key={field.id}>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type='text'
            placeholder='Tag'
            {...register(`tagList.${index}.tag`, {
              required: {
                value: true,
                message: 'The field is required.',
              },
              minLength: {
                value: 2,
                message: 'The minimum tag length is 2 characters.',
              },
              maxLength: {
                value: 50,
                message: 'The maximum tag length is 50 characters.',
              },
              validate: {
                uniqueTag: (value, { tagList }) => {
                  const tags = tagList.map((tag) => tag.tag);

                  const firstIdx = tags.indexOf(value);
                  const lastIdx = tags.lastIndexOf(value);

                  return (
                    firstIdx === lastIdx ||
                    'The tag is already contained in the list.'
                  );
                },
              },
            })}
          />
          <span className={styles.inputErrorText}>
            {errors?.tagList && errors?.tagList[index]?.tag?.message}
          </span>
        </div>
        <button
          className={styles.deleteTagBtn}
          type='button'
          onClick={() => remove(index)}
        >
          Delete
        </button>
      </li>
    );
  });

  const onSubmit = (data) => {
    const { title, description, body, tagList } = data;

    const sendData = {
      title,
      description,
      body,
      tagList: tagList.map((tag) => tag.tag),
    };

    dispatch(updateArticle({ data: sendData, token, slug }));
  };

  return (
    <>
      <div className={styles.formContainer}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.newArticleForm}
        >
          <legend className={styles.formLegend}>Create new article</legend>
          <label className={styles.label}>
            <span className={styles.inputLabelText}>Title</span>
            <input
              className={styles.input}
              type='text'
              placeholder='Title'
              {...register('title', {
                required: {
                  value: true,
                  message: 'The field is required.',
                },
                minLength: {
                  value: 5,
                  message: 'The minimum length of the title is 5 characters.',
                },
                maxLength: {
                  value: 250,
                  message: 'The maximum length of the title is 250 characters.',
                },
              })}
            />
            <span className={styles.inputErrorText}>
              {errors?.title?.message}
            </span>
          </label>
          <label className={styles.label}>
            <span className={styles.inputLabelText}>Short description</span>
            <input
              className={styles.input}
              type='text'
              placeholder='Title'
              {...register('description', {
                required: {
                  value: true,
                  message: 'The field is required.',
                },
                minLength: {
                  value: 5,
                  message: 'The minimum description length is 5 characters.',
                },
                maxLength: {
                  value: 250,
                  message:
                    'The maximum length of the description is 250 characters.',
                },
              })}
            />
            <span className={styles.inputErrorText}>
              {errors?.description?.message}
            </span>
          </label>
          <label className={styles.label}>
            <span className={styles.inputLabelText}>Text</span>
            <textarea
              className={styles.textArea}
              placeholder='Text'
              {...register('body', {
                required: {
                  value: true,
                  message: 'The field is required.',
                },
                minLength: {
                  value: 5,
                  message: 'The minimum length of the article is 5 characters.',
                },
                maxLength: {
                  value: 10000,
                  message:
                    'The maximum length of the article is 10000 characters.',
                },
              })}
            />
            <span className={styles.inputErrorText}>
              {errors?.body?.message}
            </span>
          </label>
          <div className={styles.tagsContainer}>
            {!!tagsList.length && (
              <ul className={styles.tagsList}>{tagsList}</ul>
            )}
            <button
              className={styles.addTagBtn}
              type='button'
              onClick={() => append({ tag: '' })}
            >
              Add tag
            </button>
          </div>

          <input className={styles.inputSubmit} type='submit' value='Send' />
        </form>
      </div>
      {isLoadingCreate && <LoaderSpinner />}
    </>
  );
}

export default EditArticleForm;
