import { useEffect, useState } from "react";

interface StaffMember {
  name: string;
  role: string;
  image?: string;
}

export function useAnimeStaff(animeId?: string) {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!animeId) return;

    setLoading(true);
    setError(null);

    async function fetchStaff() {
      try {
        const staffRes = await fetch(`https://kitsu.io/api/edge/anime/${animeId}/staff`);
        const staffJson = await staffRes.json();
        const staffList = staffJson.data;

        const detailedStaff = await Promise.all(
          staffList.map(async (mediaStaff: any) => {
            const personUrl = mediaStaff.relationships.person.links.related;
            const personRes = await fetch(personUrl);
            const personJson = await personRes.json();

            return {
              role: mediaStaff.attributes.role,
              name: personJson.data.attributes.name,
              image: personJson.data.attributes.image?.medium || '',
            };
          })
        );

        setStaff(detailedStaff);
      } catch (err) {
        setError('Erro ao carregar staff');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchStaff();
  }, [animeId]);

  return { staff, loading, error };
}
