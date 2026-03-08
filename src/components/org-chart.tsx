'use client'

/**
 * Org Chart Component - React Flow visualization
 * Hierarchical hierarchical agent structure
 */

import { useCallback, useMemo, useEffect } from 'react'
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from 'reactflow'
import dagre from '@dagrejs/dagre'
import 'reactflow/dist/style.css'
import { Bot } from 'lucide-react'

// Dagre layout configuration
const dagreGraph = new dagre.graphlib.Graph()
dagreGraph.setDefaultEdgeLabel(() => ({}))

const nodeWidth = 180
const nodeHeight = 60

function getLayoutedElements(nodes: Node[], edges: Edge[], direction = 'TB') {
  dagreGraph.setGraph({ rankdir: direction, nodesep: 100, ranksep: 80 })
  
  nodes.forEach(node => dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight }))
  edges.forEach(edge => dagreGraph.setEdge(edge.source, edge.target))
  
  dagre.layout(dagreGraph)
  
  const layoutedNodes = nodes.map(node => {
    const nodeWithPosition = dagreGraph.node(node.id)
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    }
  })
  
  return { nodes: layoutedNodes, edges }
}

interface Agent {
  id: string
  name: string
  title?: string
  role: string
  reportsToId?: string
  enabled: boolean
}

interface OrgChartProps {
  agents: Agent[]
  onAgentClick?: (agent: Agent) => void
}

// Custom node component
function AgentNode({ data }: { data: Agent }) {
  return (
    <div
      className={`
        px-4 py-2 rounded-lg shadow-md border-2 min-w-[180px]
        ${data.enabled 
          ? 'bg-white dark:bg-slate-800 border-blue-500' 
          : 'bg-slate-100 dark:bg-slate-900 border-slate-300 opacity-60'
        }
        cursor-pointer hover:shadow-lg transition-shadow
      `}
    >
      <div className="flex items-center gap-2">
        <Bot className="w-5 h-5 text-blue-500" />
        <div>
          <div className="font-semibold text-sm">{data.name}</div>
          {data.title && (
            <div className="text-xs text-slate-500">{data.title}</div>
          )}
        </div>
      </div>
    </div>
  )
}

const nodeTypes = {
  agent: AgentNode,
}

export function OrgChart({ agents, onAgentClick }: OrgChartProps) {
  // Build nodes from agents
  const initialNodes: Node[] = useMemo(() => {
    return agents.map((agent, index) => ({
      id: agent.id,
      type: 'agent',
      position: { x: 0, y: 0 }, // Will be arranged by dagre or manual
      data: agent,
    }))
  }, [agents])

  // Build edges from reporting relationships
  const initialEdges: Edge[] = useMemo(() => {
    return agents
      .filter(agent => agent.reportsToId)
      .map(agent => ({
        id: `${agent.reportsToId}-${agent.id}`,
        source: agent.reportsToId!,
        target: agent.id,
        type: 'smoothstep',
        animated: false,
      }))
  }, [agents])

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  // Apply dagre layout on mount
  useEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      initialNodes,
      initialEdges
    )
    setNodes(layoutedNodes)
    setEdges(layoutedEdges)
  }, [initialNodes, initialEdges, setNodes, setEdges])

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      onAgentClick?.(node.data as Agent)
    },
    [onAgentClick]
  )

  return (
    <div className="w-full h-[600px] border rounded-lg">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  )
}
