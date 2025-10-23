import type { Rule } from '@/features/rules/types';

interface GroupedRules {
  id: string;
  content: (Omit<Rule, 'type'> & { type: string })[];
}

export function groupRules(rules: Rule[]): GroupedRules[] {
  const groupsMap: Record<string, (Omit<Rule, 'type'> & { type: string })[]> = {};

  rules.forEach((rule) => {
    const tag =
      Array.isArray(rule.tags) && rule.tags.length > 0 ? rule.tags[0].toLowerCase() : 'other';

    if (!groupsMap[tag]) groupsMap[tag] = [];

    groupsMap[tag].push({
      ...rule,
      type: tag,
    });
  });

  return Object.entries(groupsMap).map(([key, content]) => ({
    id: key,
    content,
  }));
}
