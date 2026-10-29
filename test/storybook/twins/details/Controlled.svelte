<script lang="ts">
  import { Button, Details } from '../../../../src';
  import ChevronDownUpIcon from '../icons/ChevronDownUpIcon.svelte';
  import ChevronUpDownIcon from '../icons/ChevronUpDownIcon.svelte';

  let open1 = $state(false);
  let open2 = $state(false);
  let open3 = $state(false);
  const isOpen = $derived([open1, open2, open3].every(Boolean));
  const toggleOpen = () => {
    const next = !isOpen;
    open1 = next;
    open2 = next;
    open3 = next;
  };
</script>

<Button variant="tertiary" onclick={toggleOpen} data-size="sm">
  {#if isOpen}
    <ChevronDownUpIcon aria-hidden />
    Lukk alle
  {:else}
    <ChevronUpDownIcon aria-hidden />
    Åpne alle
  {/if}
</Button>
<br />

<Details bind:open={open1}>
  <Details.Summary>Enkeltpersonforetak</Details.Summary>
  <Details.Content>
    Skal du starte for deg selv? Enkeltpersonforetak er ofte den enkleste måten å etablere bedrift på. Denne
    organisasjonsformen har både fordeler og ulemper. Det gir deg stor grad av frihet, men kan også gi betydelig risiko
    fordi du har personlig ansvar for økonomien.
  </Details.Content>
</Details>
<Details bind:open={open2}>
  <Details.Summary>Aksjeselskap (AS)</Details.Summary>
  <Details.Content>
    Planlegger du å starte næringsvirksomhet alene eller sammen med andre? Innebærer næringsvirksomheten en økonomisk
    risiko? Vil du ha rettigheter som arbeidstaker og muligheten til at andre kan investere i selskapet ditt? Da kan
    aksjeselskap være en hensiktsmessig organisasjonsform.
  </Details.Content>
</Details>
<Details bind:open={open3}>
  <Details.Summary>Ansvarlig selskap (ANS/DA)</Details.Summary>
  <Details.Content>
    Er dere minst to personer som skal starte opp egen virksomhet? Samarbeider du godt med den/de som du skal starte opp
    sammen med? Krever virksomheten få investeringer og tar du liten økonomisk risiko? Da kan du vurdere å etablere et
    ansvarlig selskap.
  </Details.Content>
</Details>
