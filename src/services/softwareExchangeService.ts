import type { SoftwareCategory } from '../data/softwareExchange'

export const SOFTWARE_EXCHANGE_SUBMISSION_ENDPOINT =
  import.meta.env.VITE_SOFTWARE_EXCHANGE_SUBMISSION_ENDPOINT?.trim() ?? ''

export const SOFTWARE_EXCHANGE_REVIEW_EMAIL =
  import.meta.env.VITE_SOFTWARE_EXCHANGE_REVIEW_EMAIL?.trim() || 'balasudeep22@gmail.com'

const SOFTWARE_DRAFT_KEY = 'ria.exchange.software-draft.v1'
const REPOSITORY_DRAFT_KEY = 'ria.exchange.repository-draft.v1'
const PENDING_SUBMISSIONS_KEY = 'ria.exchange.pending-submissions.v1'

type PublicCategory = Exclude<SoftwareCategory, 'All'>
type ErrorMap<T> = Partial<Record<keyof T, string>>

export type SoftwareSubmissionInput = {
  projectName: string
  shortDescription: string
  fullDescription: string
  authorName: string
  contactEmail: string
  repositoryUrl: string
  websiteUrl: string
  category: PublicCategory
  version: string
  license: string
  tags: string
  compatibility: string
  installationNotes: string
  screenshotsUrl: string
  securityNotes: string
  confirmsOwnership: boolean
  acceptsReview: boolean
}

export type RepositorySubmissionInput = {
  repositoryUrl: string
  branch: string
  packageType: string
  manifestPath: string
  contactEmail: string
  permissionConfirmed: boolean
}

export type SoftwarePendingSubmission = SoftwareSubmissionInput & {
  id: string
  kind: 'software'
  status: 'pending-review'
  submittedAt: string
  delivery: 'local-only' | 'endpoint-accepted' | 'endpoint-failed'
}

export type RepositoryPendingSubmission = RepositorySubmissionInput & {
  id: string
  kind: 'repository'
  status: 'pending-review'
  submittedAt: string
  delivery: 'local-only' | 'endpoint-accepted' | 'endpoint-failed'
}

export type PendingSubmission = SoftwarePendingSubmission | RepositoryPendingSubmission

export type ValidationResult<T> = {
  valid: boolean
  errors: ErrorMap<T>
}

export type SubmissionResult = {
  submission: PendingSubmission
  mailtoUrl: string
  endpointConfigured: boolean
  endpointAccepted: boolean
  endpointError?: string
}

export const emptySoftwareSubmission: SoftwareSubmissionInput = {
  projectName: '',
  shortDescription: '',
  fullDescription: '',
  authorName: '',
  contactEmail: '',
  repositoryUrl: '',
  websiteUrl: '',
  category: 'Agents',
  version: '',
  license: '',
  tags: '',
  compatibility: '',
  installationNotes: '',
  screenshotsUrl: '',
  securityNotes: '',
  confirmsOwnership: false,
  acceptsReview: false
}

export const emptyRepositorySubmission: RepositorySubmissionInput = {
  repositoryUrl: '',
  branch: 'main',
  packageType: 'RIA plugin',
  manifestPath: 'ria-manifest.json',
  contactEmail: '',
  permissionConfirmed: false
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isValidHttpUrl(value: string, required = false) {
  if (!value.trim()) return !required
  try {
    const parsed = new URL(value)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

function isValidRepositoryUrl(value: string) {
  if (!isValidHttpUrl(value, true)) return false
  const host = new URL(value).hostname.toLowerCase()
  return ['github.com', 'gitlab.com', 'bitbucket.org', 'codeberg.org'].some((domain) => host === domain || host.endsWith(`.${domain}`))
}

function required(value: string, label: string, errors: Record<string, string>, key: string, minimum = 1) {
  if (value.trim().length < minimum) errors[key] = minimum > 1 ? `${label} must contain at least ${minimum} characters.` : `${label} is required.`
}

export function validateSubmission(data: SoftwareSubmissionInput): ValidationResult<SoftwareSubmissionInput> {
  const errors: ErrorMap<SoftwareSubmissionInput> = {}
  required(data.projectName, 'Project name', errors as Record<string, string>, 'projectName', 2)
  required(data.shortDescription, 'Short description', errors as Record<string, string>, 'shortDescription', 20)
  required(data.fullDescription, 'Full description', errors as Record<string, string>, 'fullDescription', 60)
  required(data.authorName, 'Author or team name', errors as Record<string, string>, 'authorName', 2)
  required(data.contactEmail, 'Contact email', errors as Record<string, string>, 'contactEmail')
  required(data.repositoryUrl, 'Repository URL', errors as Record<string, string>, 'repositoryUrl')
  required(data.version, 'Version', errors as Record<string, string>, 'version')
  required(data.license, 'License', errors as Record<string, string>, 'license')
  required(data.compatibility, 'Compatibility', errors as Record<string, string>, 'compatibility')
  required(data.tags, 'At least one tag', errors as Record<string, string>, 'tags', 2)
  required(data.installationNotes, 'Installation notes', errors as Record<string, string>, 'installationNotes', 20)
  required(data.securityNotes, 'Security notes', errors as Record<string, string>, 'securityNotes', 20)
  if (data.contactEmail && !emailPattern.test(data.contactEmail.trim())) errors.contactEmail = 'Enter a valid contact email.'
  if (data.repositoryUrl && !isValidRepositoryUrl(data.repositoryUrl)) errors.repositoryUrl = 'Use a valid GitHub, GitLab, Bitbucket, or Codeberg repository URL.'
  if (!isValidHttpUrl(data.websiteUrl)) errors.websiteUrl = 'Website URL must start with http:// or https://.'
  if (!isValidHttpUrl(data.screenshotsUrl)) errors.screenshotsUrl = 'Screenshots URL must start with http:// or https://.'
  if (!data.confirmsOwnership) errors.confirmsOwnership = 'Ownership or submission permission must be confirmed.'
  if (!data.acceptsReview) errors.acceptsReview = 'AION review must be acknowledged.'
  return { valid: Object.keys(errors).length === 0, errors }
}

export function validateRepositorySubmission(data: RepositorySubmissionInput): ValidationResult<RepositorySubmissionInput> {
  const errors: ErrorMap<RepositorySubmissionInput> = {}
  required(data.repositoryUrl, 'Repository URL', errors as Record<string, string>, 'repositoryUrl')
  required(data.branch, 'Branch', errors as Record<string, string>, 'branch')
  required(data.packageType, 'Package type', errors as Record<string, string>, 'packageType')
  required(data.manifestPath, 'Manifest path', errors as Record<string, string>, 'manifestPath')
  required(data.contactEmail, 'Contact email', errors as Record<string, string>, 'contactEmail')
  if (data.repositoryUrl && !isValidRepositoryUrl(data.repositoryUrl)) errors.repositoryUrl = 'Use a valid GitHub, GitLab, Bitbucket, or Codeberg repository URL.'
  if (data.contactEmail && !emailPattern.test(data.contactEmail.trim())) errors.contactEmail = 'Enter a valid contact email.'
  if (!data.permissionConfirmed) errors.permissionConfirmed = 'Repository review permission must be confirmed.'
  return { valid: Object.keys(errors).length === 0, errors }
}

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const stored = window.localStorage.getItem(key)
    return stored ? JSON.parse(stored) as T : fallback
  } catch {
    return fallback
  }
}

function writeStorage<T>(key: string, value: T) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function saveDraft(kind: 'software', draft: SoftwareSubmissionInput): void
export function saveDraft(kind: 'repository', draft: RepositorySubmissionInput): void
export function saveDraft(kind: 'software' | 'repository', draft: SoftwareSubmissionInput | RepositorySubmissionInput) {
  writeStorage(kind === 'software' ? SOFTWARE_DRAFT_KEY : REPOSITORY_DRAFT_KEY, draft)
}

export function getDraft(kind: 'software'): SoftwareSubmissionInput
export function getDraft(kind: 'repository'): RepositorySubmissionInput
export function getDraft(kind: 'software' | 'repository') {
  return kind === 'software'
    ? readStorage(SOFTWARE_DRAFT_KEY, emptySoftwareSubmission)
    : readStorage(REPOSITORY_DRAFT_KEY, emptyRepositorySubmission)
}

export function clearDraft(kind: 'software' | 'repository') {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(kind === 'software' ? SOFTWARE_DRAFT_KEY : REPOSITORY_DRAFT_KEY)
}

export function getPendingSubmissions(): PendingSubmission[] {
  const submissions = readStorage<PendingSubmission[]>(PENDING_SUBMISSIONS_KEY, [])
  return Array.isArray(submissions) ? submissions : []
}

function savePendingSubmission(submission: PendingSubmission) {
  const current = getPendingSubmissions().filter((item) => item.id !== submission.id)
  writeStorage(PENDING_SUBMISSIONS_KEY, [submission, ...current].slice(0, 50))
}

export function removePendingSubmission(id: string) {
  writeStorage(PENDING_SUBMISSIONS_KEY, getPendingSubmissions().filter((submission) => submission.id !== id))
}

export async function postToEndpointIfConfigured(payload: PendingSubmission) {
  if (!SOFTWARE_EXCHANGE_SUBMISSION_ENDPOINT) return { configured: false, accepted: false }
  const response = await fetch(SOFTWARE_EXCHANGE_SUBMISSION_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!response.ok) throw new Error(`Submission endpoint returned ${response.status}.`)
  return { configured: true, accepted: true }
}

function createMailto(submission: PendingSubmission) {
  const title = submission.kind === 'software' ? submission.projectName : submission.repositoryUrl
  const subject = `RIA Software Exchange review: ${title}`
  const body = [
    'RIA Software Exchange review request',
    '',
    `Submission ID: ${submission.id}`,
    `Type: ${submission.kind}`,
    `Submitted: ${submission.submittedAt}`,
    '',
    JSON.stringify(submission, null, 2),
    '',
    'This email was prepared by the frontend MVP. Sending it does not publish the software.'
  ].join('\n')
  return `mailto:${SOFTWARE_EXCHANGE_REVIEW_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function createId(kind: 'software' | 'repository') {
  const random = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
  return `ria-${kind}-${random}`
}

async function deliverSubmission(submission: PendingSubmission): Promise<SubmissionResult> {
  let endpointConfigured = Boolean(SOFTWARE_EXCHANGE_SUBMISSION_ENDPOINT)
  let endpointAccepted = false
  let endpointError: string | undefined
  savePendingSubmission(submission)
  clearDraft(submission.kind)
  try {
    const delivery = await postToEndpointIfConfigured(submission)
    endpointConfigured = delivery.configured
    endpointAccepted = delivery.accepted
  } catch (error) {
    endpointError = error instanceof Error ? error.message : 'The configured endpoint could not accept the submission.'
  }
  submission.delivery = endpointAccepted ? 'endpoint-accepted' : endpointConfigured ? 'endpoint-failed' : 'local-only'
  savePendingSubmission(submission)
  return { submission, mailtoUrl: createMailto(submission), endpointConfigured, endpointAccepted, endpointError }
}

export async function submitSoftware(data: SoftwareSubmissionInput): Promise<SubmissionResult> {
  const validation = validateSubmission(data)
  if (!validation.valid) throw new ExchangeValidationError(validation.errors)
  return deliverSubmission({ ...data, id: createId('software'), kind: 'software', status: 'pending-review', submittedAt: new Date().toISOString(), delivery: 'local-only' })
}

export async function submitRepository(data: RepositorySubmissionInput): Promise<SubmissionResult> {
  const validation = validateRepositorySubmission(data)
  if (!validation.valid) throw new ExchangeValidationError(validation.errors)
  return deliverSubmission({ ...data, id: createId('repository'), kind: 'repository', status: 'pending-review', submittedAt: new Date().toISOString(), delivery: 'local-only' })
}

export class ExchangeValidationError<T> extends Error {
  errors: ErrorMap<T>

  constructor(errors: ErrorMap<T>) {
    super('Review the highlighted submission fields.')
    this.name = 'ExchangeValidationError'
    this.errors = errors
  }
}
