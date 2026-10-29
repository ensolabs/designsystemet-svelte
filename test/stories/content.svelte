<!-- Svelte twins of the stories in content.test.tsx: the same name, the same markup. -->
<script module lang="ts">
  import Avatar from '../../src/avatar/Avatar.svelte';
  import EXPERIMENTAL_AvatarStack from '../../src/avatar-stack/AvatarStack.svelte';
  import { Card, CardBlock } from '../../src/card';
  import { Details, DetailsContent, DetailsSummary } from '../../src/details';
  import Divider from '../../src/divider/Divider.svelte';
  import Heading from '../../src/heading/Heading.svelte';
  import Link from '../../src/link/Link.svelte';
  import { List, ListItem, ListOrdered, ListUnordered } from '../../src/list';
  import Paragraph from '../../src/paragraph/Paragraph.svelte';
  import Skeleton from '../../src/skeleton/Skeleton.svelte';
  import SkipLink from '../../src/skip-link/SkipLink.svelte';
  import { Table, TableBody, TableCell, TableFoot, TableHead, TableHeaderCell, TableRow } from '../../src/table';

  export {
    heading,
    headingAsChild,
    paragraph,
    paragraphAsChild,
    link,
    linkAsChild,
    list,
    listFlat,
    listAsChild,
    divider,
    card,
    cardAsChild,
    cardClickable,
    cardClickableOwnId,
    cardClickableSkipped,
    details,
    detailsOpen,
    detailsControlled,
    detailsFlat,
    table,
    tableSortable,
    tableFlat,
    skeleton,
    skeletonText,
    skeletonStyle,
    skeletonContent,
    skeletonAsChild,
    skipLink,
    avatar,
    avatarTooltip,
    avatarContent,
    avatarAsChild,
    avatarStack,
    avatarStackExpandable,
  };
</script>

{#snippet heading()}
  <Heading>Prosjekter</Heading>
  <Heading level={1} data-size="2xl" class="extra" id="h">Designsystemet</Heading>
  <Heading level={6} data-size="2xs">Liten</Heading>
{/snippet}

{#snippet headingAsChild()}
  <Heading data-size="sm">
    {#snippet child({ props })}<span {...props}>Ikke en overskrift</span>{/snippet}
  </Heading>
{/snippet}

{#snippet paragraph()}
  <Paragraph>Tekst</Paragraph>
  <Paragraph variant="long" data-size="lg" class="extra">Lang</Paragraph>
  <Paragraph variant="short" data-size="xs">Kort</Paragraph>
  <Paragraph variant="default">Vanlig</Paragraph>
{/snippet}

{#snippet paragraphAsChild()}
  <Paragraph variant="short">
    {#snippet child({ props })}<div {...props}>I en div</div>{/snippet}
  </Paragraph>
{/snippet}

{#snippet link()}
  <Link href="/prosjekter">Prosjekter</Link>
  <Link href="https://designsystemet.no" target="_blank" rel="noreferrer" data-color="neutral" class="extra">Designsystemet</Link>
{/snippet}

{#snippet linkAsChild()}
  <Link data-color="accent">
    {#snippet child({ props })}<button type="button" {...props}>Knapp som lenke</button>{/snippet}
  </Link>
{/snippet}

{#snippet list()}
  <List.Unordered data-size="sm" class="extra">
    <List.Item>Én</List.Item>
    <List.Item class="item" value={2}>To</List.Item>
  </List.Unordered>
  <List.Ordered start={3} reversed>
    <List.Item>Tre</List.Item>
  </List.Ordered>
{/snippet}

{#snippet listFlat()}
  <ListUnordered><ListItem>A</ListItem></ListUnordered>
  <ListOrdered type="a"><ListItem>B</ListItem></ListOrdered>
{/snippet}

{#snippet listAsChild()}
  <ListUnordered>
    {#snippet child({ props })}<menu {...props}>
        <ListItem>
          {#snippet child({ props })}<li {...props} class="custom">Punkt</li>{/snippet}
        </ListItem>
      </menu>{/snippet}
  </ListUnordered>
  <ListOrdered>
    {#snippet child({ props })}<ol {...props} id="o"><li>X</li></ol>{/snippet}
  </ListOrdered>
{/snippet}

{#snippet divider()}
  <Divider />
  <Divider class="extra" aria-hidden="false" data-color="accent" />
{/snippet}

{#snippet card()}
  <Card>
    <Card.Block>Topp</Card.Block>
    <Card.Block class="extra">Innhold</Card.Block>
  </Card>
  <Card variant="tinted" data-color="accent" class="extra">
    <CardBlock>
      {#snippet child({ props })}<section {...props}>Seksjon</section>{/snippet}
    </CardBlock>
  </Card>
  <Card variant="default"><p>Uten blokker</p></Card>
{/snippet}

{#snippet cardAsChild()}
  <Card variant="tinted">
    {#snippet child({ props })}<article {...props}>
        <h2><a href="/a">Artikkel</a></h2>
      </article>{/snippet}
  </Card>
{/snippet}

{#snippet cardClickable()}
  <Card>
    <Card.Block>
      <h3><a href="/prosjekt">Prosjekt</a></h3>
      <p>Les mer</p>
      <a href="/annen">Annen lenke</a>
    </Card.Block>
  </Card>
{/snippet}

{#snippet cardClickableOwnId()}
  <Card data-clickdelegatefor="x">
    <h2><a href="/b">Har allerede</a></h2>
  </Card>
  <Card>
    <h2><a href="/c" id="egen">Egen id</a></h2>
  </Card>
{/snippet}

{#snippet cardClickableSkipped()}
  <Card>
    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label><h2><a href="/d">I en label</a></h2></label>
  </Card>
  <Card>
    <p><a href="/e">Ikke i en overskrift</a></p>
  </Card>
{/snippet}

{#snippet details()}
  <Details>
    <Details.Summary>Mer</Details.Summary>
    <Details.Content>Innhold</Details.Content>
  </Details>
  <Details variant="tinted" data-color="neutral" class="extra" name="gruppe">
    <Details.Summary class="s">Tonet</Details.Summary>
    <Details.Content class="c">Innhold</Details.Content>
  </Details>
{/snippet}

{#snippet detailsOpen()}
  <Details defaultOpen>
    <Details.Summary>Åpen</Details.Summary>
    <Details.Content>Innhold</Details.Content>
  </Details>
  <Details defaultOpen={false}>
    <Details.Summary>Lukket</Details.Summary>
  </Details>
{/snippet}

{#snippet detailsControlled()}
  <Details open={true} onToggle={() => {}}>
    <Details.Summary>Styrt åpen</Details.Summary>
  </Details>
  <Details open={false} onToggle={() => {}} defaultOpen>
    <Details.Summary>Styrt lukket</Details.Summary>
  </Details>
{/snippet}

{#snippet detailsFlat()}
  <Details>
    <DetailsSummary>Flat</DetailsSummary>
    <DetailsContent>Innhold</DetailsContent>
  </Details>
{/snippet}

{#snippet table()}
  <Table>
    <caption>Enkel</caption>
    <Table.Head>
      <Table.Row>
        <Table.HeaderCell>Navn</Table.HeaderCell>
        <Table.HeaderCell scope="col">Areal</Table.HeaderCell>
      </Table.Row>
    </Table.Head>
    <Table.Body>
      <Table.Row>
        <Table.HeaderCell scope="row">A</Table.HeaderCell>
        <Table.Cell colspan={1}>100</Table.Cell>
      </Table.Row>
    </Table.Body>
    <Table.Foot>
      <Table.Row>
        <Table.Cell>Sum</Table.Cell>
        <Table.Cell>100</Table.Cell>
      </Table.Row>
    </Table.Foot>
  </Table>
  <Table zebra stickyHeader border hover data-size="sm" data-color="accent" class="extra" style="height: 10rem">
    <Table.Body><Table.Row class="r"><Table.Cell class="c">1</Table.Cell></Table.Row></Table.Body>
  </Table>
  <Table zebra={false} stickyHeader={false} border={false} hover={false}></Table>
{/snippet}

{#snippet tableSortable()}
  <Table>
    <Table.Head>
      <Table.Row>
        <Table.HeaderCell sort="ascending">Navn</Table.HeaderCell>
        <Table.HeaderCell sort="descending" class="extra">Areal</Table.HeaderCell>
        <Table.HeaderCell sort="none">Sted</Table.HeaderCell>
        <Table.HeaderCell sort="other">Annet</Table.HeaderCell>
        <Table.HeaderCell>Ikke sorterbar</Table.HeaderCell>
      </Table.Row>
    </Table.Head>
  </Table>
{/snippet}

{#snippet tableFlat()}
  <Table>
    <TableHead><TableRow><TableHeaderCell>H</TableHeaderCell></TableRow></TableHead>
    <TableBody><TableRow><TableCell>B</TableCell></TableRow></TableBody>
    <TableFoot><TableRow><TableCell>F</TableCell></TableRow></TableFoot>
  </Table>
{/snippet}

{#snippet skeleton()}
  <Skeleton />
  <Skeleton variant="circle" width={40} height={40} />
  <Skeleton variant="rectangle" width="100%" height="8rem" class="extra" />
  <Skeleton variant="rectangle" width={0} height="" />
{/snippet}

{#snippet skeletonText()}
  <Skeleton variant="text" />
  <Skeleton variant="text" width={12} height={30} style="max-width: 10rem" />
  <Skeleton variant="text" width="abc" />
  <Skeleton variant="text" characters={20} />
{/snippet}

{#snippet skeletonStyle()}
  <Skeleton width={40} height={20} style="width: 50px; color: red" />
  <Skeleton style="margin: 0" aria-hidden="false" />
{/snippet}

{#snippet skeletonContent()}
  <Skeleton><p>Innhold som tar plass</p></Skeleton>
{/snippet}

{#snippet skeletonAsChild()}
  <Skeleton variant="rectangle" width={10}>
    {#snippet child({ props })}<div {...props}>Div</div>{/snippet}
  </Skeleton>
{/snippet}

{#snippet skipLink()}
  <SkipLink href="#main">Hopp til hovedinnhold</SkipLink>
  <SkipLink href="#nav" class="extra" data-color="neutral">Hopp til meny</SkipLink>
{/snippet}

{#snippet avatar()}
  <Avatar aria-label="Ola Nordmann" initials="ON" />
  <Avatar aria-label="Kari" data-initials="KN" variant="square" data-size="xs" data-color="accent" class="extra" />
  <Avatar aria-label="Per" />
  <Avatar aria-hidden="true" initials="AB" data-initials="CD" />
{/snippet}

{#snippet avatarTooltip()}
  <Avatar data-tooltip="Ola Nordmann" initials="ON" />
  <Avatar aria-hidden="true" aria-label="Navn" data-tooltip="Verktøytips" tabindex={-1} />
{/snippet}

{#snippet avatarContent()}
  <Avatar aria-label="Ola" initials="ON"><img src="/ola.png" alt="" /></Avatar>
  <Avatar aria-label="Ikon"><svg></svg></Avatar>
  <Avatar aria-label="Tekst">sm</Avatar>
{/snippet}

{#snippet avatarAsChild()}
  <Avatar aria-label="Til profil" initials="ON">
    {#snippet child({ props })}<a href="/profil" {...props}>ON</a>{/snippet}
  </Avatar>
  <Avatar aria-label="Med innhold" initials="ON">
    {#snippet child({ props })}<a href="/p" {...props}><img src="/p.png" alt="" /></a>{/snippet}
  </Avatar>
{/snippet}

{#snippet avatarStack()}
  <EXPERIMENTAL_AvatarStack>
    <li><Avatar aria-label="A">A</Avatar></li>
    <li><Avatar aria-label="B">B</Avatar></li>
  </EXPERIMENTAL_AvatarStack>
  <EXPERIMENTAL_AvatarStack gap="2px" avatarSize="2rem" overlap={30} suffix="+5" class="extra" data-size="sm" style="margin: 0">
    <li><Avatar aria-label="C">C</Avatar></li>
  </EXPERIMENTAL_AvatarStack>
  <EXPERIMENTAL_AvatarStack overlap="4px" suffix="" style="--dsc-avatar-stack-overlap: 1px"></EXPERIMENTAL_AvatarStack>
{/snippet}

{#snippet avatarStackExpandable()}
  <EXPERIMENTAL_AvatarStack expandable><li>A</li></EXPERIMENTAL_AvatarStack>
  <EXPERIMENTAL_AvatarStack expandable="fixed" tabindex={-1}><li>B</li></EXPERIMENTAL_AvatarStack>
  <EXPERIMENTAL_AvatarStack expandable={false}><li>C</li></EXPERIMENTAL_AvatarStack>
{/snippet}
