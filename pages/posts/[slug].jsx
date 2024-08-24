import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PostPage = ({ post }) => {
  if (!post) {
    return <p>Post não encontrado.</p>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p><strong>Tema:</strong> {post.theme}</p>
      <p><strong>Data:</strong> {new Date(post.created_at).toLocaleDateString()}</p>
      {post.image && (
        <div>
          <img src={post.image} alt={post.title} style={{ maxWidth: '50%', height: 'auto' }} />
        </div>
      )}
      <div>
        <h2>Conteúdo:</h2>
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.params;

  try {
    const post = await prisma.posts.findUnique({
      where: {
        slug: slug,
      },
    });

    if (post) {
      // Converta datas para strings
      post.created_at = post.created_at ? post.created_at.toISOString() : null;
      post.updated_at = post.updated_at ? post.updated_at.toISOString() : null;
    }

    return {
      props: { post: post || null },
    };
  } catch (error) {
    console.error('Erro ao buscar o post:', error);
    return {
      props: { post: null },
    };
  }
}

export default PostPage;
