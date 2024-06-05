interface PostFormProps {
  buttonText: string;
  onSubmit: (data: PostFormData) => unknown;
  defaultValues?: PostFormData;
}

export interface PostFormData {
  title: string;
  content: string;
}

const PostForm = ({
  onSubmit,
  buttonText,
  defaultValues = { title: '', content: '' },
}: PostFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form).entries() as Iterable<
      [PostFormData, FormDataEntryValue]
    >;
    const data = Object.fromEntries(formData) as PostFormData;
    onSubmit(data);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='title'>Title</label>
        <input
          id='title'
          type='text'
          name='title'
          defaultValue={defaultValues.title}
        />
      </div>
      <div>
        <label htmlFor='content'>Content</label>
        <textarea
          id='content'
          name='content'
          defaultValue={defaultValues.content}
        />
      </div>
      <div>
        <button>{buttonText}</button>
      </div>
    </form>
  );
};

export default PostForm;
