<!-- Svelte twins of packages/react/src/components/list/list.stories.tsx. -->
<script module lang="ts">
  import { Heading, Link, List } from '../../../src';

  const links = [
    { href: 'https://www.designsystemet.no/no/fundamentals', text: 'Grunnleggende' },
    { href: 'https://www.designsystemet.no/no/best-practices', text: 'God praksis' },
    { href: 'https://www.designsystemet.no/no/patterns', text: 'Mønstre' },
  ];

  export { Preview, Sortert, Usortert, Innrykk, ListeMedLenker, ListeMedOverskrift };
</script>

{#snippet Preview()}
  <List.Unordered>
    <List.Item>Bøyabreen</List.Item>
    <List.Item>Briksdalsbreen</List.Item>
    <List.Item>Nigardsbreen</List.Item>
  </List.Unordered>
{/snippet}

{#snippet Sortert()}
  <Heading level={2} data-size="xs" style="margin-bottom: var(--ds-size-2)">Slik gjør du:</Heading>
  <List.Ordered>
    <List.Item>
      Tørk over kyllingfiletene før du krydrer og steker. Dette vil gi en finere stekeskorpe på kjøttet. Ikke bruk
      kjøkkenpapir som loer. Papirbiter i maten er ikke noe særlig.
    </List.Item>
    <List.Item>
      Ha salt og pepper på filetene og eventuelt annet krydder for ekstra smak. Hvitløkpepper, paprika eller provence kan
      gi en god smak!
    </List.Item>
    <List.Item>
      Stek filetene på sterk varme i to minutter på hver side. Sett deretter på lokk og stek videre på svak varme i syv
      minutter på hver side.
    </List.Item>
  </List.Ordered>
{/snippet}

{#snippet Usortert()}
  <Heading level={2} data-size="xs" style="margin-bottom: var(--ds-size-2)">
    Foreningen har plikt til å ha revisor hvis de har
  </Heading>
  <List.Unordered>
    <List.Item>et gjennomsnittlig antall ansatte som tilsvarer ti årsverk eller mer</List.Item>
    <List.Item>balansesum som er 27 millioner kroner eller mer</List.Item>
    <List.Item>driftsinntekter for sin samlede virksomhet på 7 millioner kroner eller mer</List.Item>
  </List.Unordered>
{/snippet}

{#snippet Innrykk()}
  <Heading style="margin-block-end: var(--ds-size-3)">Slik søker du:</Heading>
  <List.Unordered>
    <List.Item>
      <Heading level={3} data-size="xs" style="margin-block: var(--ds-size-2)">{' '}Forbered dokumentasjon</Heading>
      <List.Ordered>
        <List.Item>Pass eller annen gyldig ID</List.Item>
        <List.Item>Dokumentasjon på adresse</List.Item>
        <List.Item>Eventuell tilleggsdokumentasjon</List.Item>
      </List.Ordered>
    </List.Item>
    <List.Item>
      <Heading level={3} data-size="xs" style="margin-block: var(--ds-size-2)">{' '}Fyll ut søknadsskjema</Heading>
      <List.Unordered>
        <List.Item>Oppgi personopplysninger</List.Item>
        <List.Item>Beskriv formålet med søknaden</List.Item>
        <List.Item>Last opp dokumentasjon</List.Item>
      </List.Unordered>
    </List.Item>
    <List.Item>
      <Heading level={3} data-size="xs" style="margin-block: var(--ds-size-2)">Send inn og følg opp</Heading>
      <List.Unordered>
        <List.Item>Kontroller opplysningene før innsending</List.Item>
        <List.Item>Send inn søknaden</List.Item>
        <List.Item>Følg med på svar i innboksen din</List.Item>
      </List.Unordered>
    </List.Item>
  </List.Unordered>
{/snippet}

{#snippet linkItems()}
  {#each links as link (link.href)}
    <List.Item>
      <Link href={link.href} target="_blank">{link.text}</Link>
    </List.Item>
  {/each}
{/snippet}

{#snippet ListeMedLenker()}
  <List.Unordered style="list-style: none; padding: 0">{@render linkItems()}</List.Unordered>
{/snippet}

{#snippet ListeMedOverskrift()}
  {#each [{ list: 'sm', heading: '2xs' }, { list: 'md', heading: 'xs' }, { list: 'lg', heading: 'sm' }] as const as size (size.list)}
    <div>
      <Heading level={2} data-size={size.heading} style="margin-bottom: var(--ds-size-2)">
        List {size.list} og Heading {size.heading}
      </Heading>
      <List.Unordered data-size={size.list}>{@render linkItems()}</List.Unordered>
    </div>
  {/each}
{/snippet}
