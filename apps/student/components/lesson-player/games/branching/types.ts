export interface BranchingChoice {
  id: string
  label: string
  text: string
  nextNodeId?: string
  isOptimal?: boolean
  feedback?: string
}

export interface BranchingNode {
  id: string
  title: string
  description: string
  context?: string
  imageUrl?: string
  choices: BranchingChoice[]
  isEndNode?: boolean
}

export interface BranchingContent {
  title: string
  subtitle: string
  description: string
  startNodeId: string
  nodes: Record<string, BranchingNode>
}

export interface BranchingState {
  currentNodeId: string
  visitedNodes: string[]
  choicesMade: Array<{ nodeId: string; choiceId: string }>
  score: number
}
