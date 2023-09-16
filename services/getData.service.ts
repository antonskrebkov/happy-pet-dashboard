export async function getQuestions() {
  const response = await fetch(
    "https://648077e2f061e6ec4d4955d9.mockapi.io/questions",
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) throw new Error("Unable to fetch questions!");

  return response.json();
}

export async function getQuestionById(id: string) {
  const response = await fetch(
    `https://648077e2f061e6ec4d4955d9.mockapi.io/questions/${id}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) throw new Error("Unable to fetch question with id " + id);

  return response.json();
}

export async function getApplications() {
  const response = await fetch(
    "https://648077e2f061e6ec4d4955d9.mockapi.io/applications",
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) throw new Error("Unable to fetch applications!");

  return response.json();
}

export async function getApplicationById(id: string) {
  const response = await fetch(
    `https://648077e2f061e6ec4d4955d9.mockapi.io/applications/${id}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) throw new Error("Unable to fetch application!");

  return response.json();
}

export async function getPets() {
  const response = await fetch(
    "https://64807757f061e6ec4d4954e4.mockapi.io/friends",
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) throw new Error("Unable to fetch pets!");

  return response.json();
}

export async function getPetById(id: string) {
  const response = await fetch(
    `https://64807757f061e6ec4d4954e4.mockapi.io/friends/${id}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) throw new Error("Unable to fetch pet!");

  return response.json();
}

export async function getCategories() {
  const response = await fetch(
    "https://64807757f061e6ec4d4954e4.mockapi.io/categories",
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) throw new Error("Unable to fetch categories!");

  return response.json();
}

export async function getCategoryById(id: string) {
  const response = await fetch(
    `https://64807757f061e6ec4d4954e4.mockapi.io/categories/${id}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) throw new Error("Unable to fetch category!");

  return response.json();
}
