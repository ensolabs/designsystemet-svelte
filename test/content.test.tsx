import {
  Avatar,
  Card,
  CardBlock,
  Details,
  DetailsContent,
  DetailsSummary,
  Divider,
  EXPERIMENTAL_AvatarStack,
  Heading,
  Link,
  List,
  ListItem,
  ListOrdered,
  ListUnordered,
  Paragraph,
  Skeleton,
  SkipLink,
  Table,
  TableBody,
  TableCell,
  TableFoot,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@digdir/designsystemet-react';
import type { CSSProperties, ReactElement } from 'react';
import type { Snippet } from 'svelte';
import { expect, test } from 'vitest';
import { both } from './parity';
import * as S from './stories/content.svelte';

const stories: Record<Exclude<keyof typeof S, 'default'>, ReactElement> = {
  heading: (
    <>
      <Heading>Prosjekter</Heading>
      <Heading level={1} data-size="2xl" className="extra" id="h">Designsystemet</Heading>
      <Heading level={6} data-size="2xs">Liten</Heading>
    </>
  ),
  headingAsChild: (
    <Heading data-size="sm" asChild>
      <span>Ikke en overskrift</span>
    </Heading>
  ),
  paragraph: (
    <>
      <Paragraph>Tekst</Paragraph>
      <Paragraph variant="long" data-size="lg" className="extra">Lang</Paragraph>
      <Paragraph variant="short" data-size="xs">Kort</Paragraph>
      <Paragraph variant="default">Vanlig</Paragraph>
    </>
  ),
  paragraphAsChild: (
    <Paragraph variant="short" asChild>
      <div>I en div</div>
    </Paragraph>
  ),
  link: (
    <>
      <Link href="/prosjekter">Prosjekter</Link>
      <Link href="https://designsystemet.no" target="_blank" rel="noreferrer" data-color="neutral" className="extra">Designsystemet</Link>
    </>
  ),
  linkAsChild: (
    <Link data-color="accent" asChild>
      <button type="button">Knapp som lenke</button>
    </Link>
  ),
  list: (
    <>
      <List.Unordered data-size="sm" className="extra">
        <List.Item>Én</List.Item>
        <List.Item className="item" value={2}>To</List.Item>
      </List.Unordered>
      <List.Ordered start={3} reversed>
        <List.Item>Tre</List.Item>
      </List.Ordered>
    </>
  ),
  listFlat: (
    <>
      <ListUnordered><ListItem>A</ListItem></ListUnordered>
      <ListOrdered type="a"><ListItem>B</ListItem></ListOrdered>
    </>
  ),
  listAsChild: (
    <>
      <ListUnordered asChild>
        <menu>
          <ListItem asChild>
            <li className="custom">Punkt</li>
          </ListItem>
        </menu>
      </ListUnordered>
      <ListOrdered asChild>
        <ol id="o"><li>X</li></ol>
      </ListOrdered>
    </>
  ),
  divider: (
    <>
      <Divider />
      <Divider className="extra" aria-hidden="false" data-color="accent" />
    </>
  ),
  card: (
    <>
      <Card>
        <Card.Block>Topp</Card.Block>
        <Card.Block className="extra">Innhold</Card.Block>
      </Card>
      <Card variant="tinted" data-color="accent" className="extra">
        <CardBlock asChild>
          <section>Seksjon</section>
        </CardBlock>
      </Card>
      <Card variant="default"><p>Uten blokker</p></Card>
    </>
  ),
  cardAsChild: (
    <Card variant="tinted" asChild>
      <article>
        <h2><a href="/a">Artikkel</a></h2>
      </article>
    </Card>
  ),
  cardClickable: (
    <Card>
      <Card.Block>
        <h3><a href="/prosjekt">Prosjekt</a></h3>
        <p>Les mer</p>
        <a href="/annen">Annen lenke</a>
      </Card.Block>
    </Card>
  ),
  cardClickableOwnId: (
    <>
      <Card {...{ 'data-clickdelegatefor': 'x' }}>
        <h2><a href="/b">Har allerede</a></h2>
      </Card>
      <Card>
        <h2><a href="/c" id="egen">Egen id</a></h2>
      </Card>
    </>
  ),
  cardClickableSkipped: (
    <>
      <Card>
        <label><h2><a href="/d">I en label</a></h2></label>
      </Card>
      <Card>
        <p><a href="/e">Ikke i en overskrift</a></p>
      </Card>
    </>
  ),
  details: (
    <>
      <Details>
        <Details.Summary>Mer</Details.Summary>
        <Details.Content>Innhold</Details.Content>
      </Details>
      <Details variant="tinted" data-color="neutral" className="extra" name="gruppe">
        <Details.Summary className="s">Tonet</Details.Summary>
        <Details.Content className="c">Innhold</Details.Content>
      </Details>
    </>
  ),
  detailsOpen: (
    <>
      <Details defaultOpen>
        <Details.Summary>Åpen</Details.Summary>
        <Details.Content>Innhold</Details.Content>
      </Details>
      <Details defaultOpen={false}>
        <Details.Summary>Lukket</Details.Summary>
      </Details>
    </>
  ),
  detailsControlled: (
    <>
      <Details open onToggle={() => {}}>
        <Details.Summary>Styrt åpen</Details.Summary>
      </Details>
      <Details open={false} onToggle={() => {}} defaultOpen>
        <Details.Summary>Styrt lukket</Details.Summary>
      </Details>
    </>
  ),
  detailsFlat: (
    <Details>
      <DetailsSummary>Flat</DetailsSummary>
      <DetailsContent>Innhold</DetailsContent>
    </Details>
  ),
  table: (
    <>
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
            <Table.Cell colSpan={1}>100</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Foot>
          <Table.Row>
            <Table.Cell>Sum</Table.Cell>
            <Table.Cell>100</Table.Cell>
          </Table.Row>
        </Table.Foot>
      </Table>
      <Table zebra stickyHeader border hover data-size="sm" data-color="accent" className="extra" style={{ height: '10rem' }}>
        <Table.Body><Table.Row className="r"><Table.Cell className="c">1</Table.Cell></Table.Row></Table.Body>
      </Table>
      <Table zebra={false} stickyHeader={false} border={false} hover={false}></Table>
    </>
  ),
  tableSortable: (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell sort="ascending">Navn</Table.HeaderCell>
          <Table.HeaderCell sort="descending" className="extra">Areal</Table.HeaderCell>
          <Table.HeaderCell sort="none">Sted</Table.HeaderCell>
          <Table.HeaderCell sort="other">Annet</Table.HeaderCell>
          <Table.HeaderCell>Ikke sorterbar</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
    </Table>
  ),
  tableFlat: (
    <Table>
      <TableHead><TableRow><TableHeaderCell>H</TableHeaderCell></TableRow></TableHead>
      <TableBody><TableRow><TableCell>B</TableCell></TableRow></TableBody>
      <TableFoot><TableRow><TableCell>F</TableCell></TableRow></TableFoot>
    </Table>
  ),
  skeleton: (
    <>
      <Skeleton />
      <Skeleton variant="circle" width={40} height={40} />
      <Skeleton variant="rectangle" width="100%" height="8rem" className="extra" />
      <Skeleton variant="rectangle" width={0} height="" />
    </>
  ),
  skeletonText: (
    <>
      <Skeleton variant="text" />
      <Skeleton variant="text" width={12} height={30} style={{ maxWidth: '10rem' }} />
      <Skeleton variant="text" width="abc" />
      <Skeleton variant="text" characters={20} />
    </>
  ),
  skeletonStyle: (
    <>
      <Skeleton width={40} height={20} style={{ width: '50px', color: 'red' }} />
      <Skeleton style={{ margin: 0 }} aria-hidden="false" />
    </>
  ),
  skeletonContent: (
    <Skeleton><p>Innhold som tar plass</p></Skeleton>
  ),
  skeletonAsChild: (
    <Skeleton variant="rectangle" width={10} asChild>
      <div>Div</div>
    </Skeleton>
  ),
  skipLink: (
    <>
      <SkipLink href="#main">Hopp til hovedinnhold</SkipLink>
      <SkipLink href="#nav" className="extra" data-color="neutral">Hopp til meny</SkipLink>
    </>
  ),
  avatar: (
    <>
      <Avatar aria-label="Ola Nordmann" initials="ON" />
      <Avatar aria-label="Kari" data-initials="KN" variant="square" data-size="xs" data-color="accent" className="extra" />
      <Avatar aria-label="Per" />
      <Avatar aria-hidden="true" initials="AB" data-initials="CD" />
    </>
  ),
  avatarTooltip: (
    <>
      <Avatar data-tooltip="Ola Nordmann" initials="ON" />
      <Avatar aria-hidden="true" aria-label="Navn" data-tooltip="Verktøytips" tabIndex={-1} />
    </>
  ),
  avatarContent: (
    <>
      <Avatar aria-label="Ola" initials="ON"><img src="/ola.png" alt="" /></Avatar>
      <Avatar aria-label="Ikon"><svg /></Avatar>
      <Avatar aria-label="Tekst">sm</Avatar>
    </>
  ),
  avatarAsChild: (
    <>
      <Avatar aria-label="Til profil" initials="ON" asChild>
        <a href="/profil" />
      </Avatar>
      <Avatar aria-label="Med innhold" initials="ON" asChild>
        <a href="/p"><img src="/p.png" alt="" /></a>
      </Avatar>
    </>
  ),
  avatarStack: (
    <>
      <EXPERIMENTAL_AvatarStack>
        <li><Avatar aria-label="A">A</Avatar></li>
        <li><Avatar aria-label="B">B</Avatar></li>
      </EXPERIMENTAL_AvatarStack>
      <EXPERIMENTAL_AvatarStack gap="2px" avatarSize="2rem" overlap={30} suffix="+5" className="extra" data-size="sm" style={{ margin: 0 }}>
        <li><Avatar aria-label="C">C</Avatar></li>
      </EXPERIMENTAL_AvatarStack>
      <EXPERIMENTAL_AvatarStack overlap="4px" suffix="" style={{ '--dsc-avatar-stack-overlap': '1px' } as CSSProperties}></EXPERIMENTAL_AvatarStack>
    </>
  ),
  avatarStackExpandable: (
    <>
      <EXPERIMENTAL_AvatarStack expandable><li>A</li></EXPERIMENTAL_AvatarStack>
      <EXPERIMENTAL_AvatarStack expandable="fixed" tabIndex={-1}><li>B</li></EXPERIMENTAL_AvatarStack>
      <EXPERIMENTAL_AvatarStack expandable={false}><li>C</li></EXPERIMENTAL_AvatarStack>
    </>
  ),
};

for (const [name, react] of Object.entries(stories)) {
  test(name, async () => {
    const out = await both(react, (S as unknown as Record<string, Snippet>)[name]);
    expect(out.svelte).toBe(out.react);
  });
}
