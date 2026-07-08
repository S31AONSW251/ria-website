import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { AlertCircle, CheckCircle2, Github, Mail, Save, ShieldCheck, UploadCloud, X } from 'lucide-react'
import { softwareCategories } from '../../data/softwareExchange'
import {
  ExchangeValidationError,
  SOFTWARE_EXCHANGE_SUBMISSION_ENDPOINT,
  emptyRepositorySubmission,
  emptySoftwareSubmission,
  getDraft,
  saveDraft,
  submitRepository,
  submitSoftware,
  type RepositorySubmissionInput,
  type SoftwareSubmissionInput,
  type SubmissionResult
} from '../../services/softwareExchangeService'

type DialogMode = 'software' | 'repository'

type Props = {
  mode: DialogMode
  onClose: () => void
  onViewPending: () => void
  onSubmitted: (result: SubmissionResult) => void
}

type FieldProps = {
  label: string
  htmlFor: string
  error?: string
  required?: boolean
  hint?: string
  wide?: boolean
  children: ReactNode
}

function Field({ label, htmlFor, error, required, hint, wide, children }: FieldProps) {
  return (
    <div className={`exchange-form-field${wide ? ' is-wide' : ''}${error ? ' has-error' : ''}`}>
      <label htmlFor={htmlFor}>{label}{required && <span aria-hidden="true"> *</span>}</label>
      {children}
      {hint && !error && <small>{hint}</small>}
      {error && <small className="exchange-field-error"><AlertCircle aria-hidden="true" /> {error}</small>}
    </div>
  )
}

function SubmissionSuccess({ result, onClose }: { result: SubmissionResult; onClose: () => void }) {
  const needsEmail = !result.endpointAccepted
  return (
    <div className="exchange-submit-success">
      <span className="exchange-success-icon"><CheckCircle2 aria-hidden="true" /></span>
      <p className="exchange-eyebrow"><span /> PENDING REVIEW / LOCAL RECORD CREATED</p>
      <h2>Submission prepared honestly.</h2>
      <p>
        This request is stored in this browser under Pending Review.
        {result.endpointAccepted
          ? ' The configured review endpoint also accepted the JSON payload.'
          : ' It is not public and has not been uploaded to AION infrastructure.'}
      </p>
      {result.endpointError && <div className="exchange-form-alert is-error"><AlertCircle aria-hidden="true" /> {result.endpointError} The local record is safe; use email review below.</div>}
      <dl>
        <div><dt>Submission ID</dt><dd>{result.submission.id}</dd></div>
        <div><dt>Delivery</dt><dd>{result.submission.delivery.replace(/-/g, ' ')}</dd></div>
        <div><dt>Status</dt><dd>Pending review</dd></div>
      </dl>
      <div className="exchange-dialog-actions">
        {needsEmail && <a className="exchange-button exchange-button-primary" href={result.mailtoUrl}><Mail aria-hidden="true" /> Open email review</a>}
        <button className="exchange-button exchange-button-secondary" type="button" onClick={onClose}>View pending list</button>
      </div>
      {needsEmail && <small>Your email client opens with the submission details. Nothing is sent until you review and send that email.</small>}
    </div>
  )
}

function SoftwareForm({ onSubmitted }: { onSubmitted: (result: SubmissionResult) => void }) {
  const [form, setForm] = useState<SoftwareSubmissionInput>(() => ({ ...emptySoftwareSubmission, ...getDraft('software') }))
  const [errors, setErrors] = useState<Partial<Record<keyof SoftwareSubmissionInput, string>>>({})
  const [generalError, setGeneralError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => saveDraft('software', form), 350)
    return () => window.clearTimeout(timer)
  }, [form])

  const update = <K extends keyof SoftwareSubmissionInput>(key: K, value: SoftwareSubmissionInput[K]) => {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setSubmitting(true)
    setGeneralError('')
    try {
      const result = await submitSoftware(form)
      onSubmitted(result)
      if (!result.endpointAccepted) window.location.href = result.mailtoUrl
    } catch (error) {
      if (error instanceof ExchangeValidationError) setErrors(error.errors as Partial<Record<keyof SoftwareSubmissionInput, string>>)
      else setGeneralError(error instanceof Error ? error.message : 'The submission could not be prepared in this browser.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="exchange-submission-form" onSubmit={submit} noValidate>
      <div className="exchange-form-note"><Save aria-hidden="true" /><span><strong>Draft recovery active.</strong> Fields are saved only in this browser while you work.</span></div>
      {generalError && <div className="exchange-form-alert is-error" role="alert"><AlertCircle aria-hidden="true" /> {generalError}</div>}
      <div className="exchange-form-grid">
        <Field label="Project name" htmlFor="projectName" error={errors.projectName} required>
          <input id="projectName" value={form.projectName} onChange={(e) => update('projectName', e.target.value)} aria-invalid={Boolean(errors.projectName)} />
        </Field>
        <Field label="Author / team name" htmlFor="authorName" error={errors.authorName} required>
          <input id="authorName" value={form.authorName} onChange={(e) => update('authorName', e.target.value)} aria-invalid={Boolean(errors.authorName)} />
        </Field>
        <Field label="Short description" htmlFor="shortDescription" error={errors.shortDescription} hint="20+ characters. Used in registry cards." required wide>
          <input id="shortDescription" value={form.shortDescription} onChange={(e) => update('shortDescription', e.target.value)} maxLength={180} aria-invalid={Boolean(errors.shortDescription)} />
        </Field>
        <Field label="Full description" htmlFor="fullDescription" error={errors.fullDescription} hint="Explain purpose, architecture, data flow, and intended users." required wide>
          <textarea id="fullDescription" value={form.fullDescription} onChange={(e) => update('fullDescription', e.target.value)} rows={5} aria-invalid={Boolean(errors.fullDescription)} />
        </Field>
        <Field label="Contact email" htmlFor="contactEmail" error={errors.contactEmail} required>
          <input id="contactEmail" type="email" value={form.contactEmail} onChange={(e) => update('contactEmail', e.target.value)} autoComplete="email" aria-invalid={Boolean(errors.contactEmail)} />
        </Field>
        <Field label="Repository URL" htmlFor="repositoryUrl" error={errors.repositoryUrl} hint="GitHub, GitLab, Bitbucket, or Codeberg." required>
          <input id="repositoryUrl" type="url" value={form.repositoryUrl} onChange={(e) => update('repositoryUrl', e.target.value)} placeholder="https://github.com/team/project" aria-invalid={Boolean(errors.repositoryUrl)} />
        </Field>
        <Field label="Website / demo URL" htmlFor="websiteUrl" error={errors.websiteUrl} hint="Optional">
          <input id="websiteUrl" type="url" value={form.websiteUrl} onChange={(e) => update('websiteUrl', e.target.value)} placeholder="https://" aria-invalid={Boolean(errors.websiteUrl)} />
        </Field>
        <Field label="Screenshots URL" htmlFor="screenshotsUrl" error={errors.screenshotsUrl} hint="Optional hosted gallery or image URL">
          <input id="screenshotsUrl" type="url" value={form.screenshotsUrl} onChange={(e) => update('screenshotsUrl', e.target.value)} placeholder="https://" aria-invalid={Boolean(errors.screenshotsUrl)} />
        </Field>
        <Field label="Category" htmlFor="category" required>
          <select id="category" value={form.category} onChange={(e) => update('category', e.target.value as SoftwareSubmissionInput['category'])}>
            {softwareCategories.filter((item) => item !== 'All').map((item) => <option key={item}>{item}</option>)}
          </select>
        </Field>
        <Field label="Version" htmlFor="version" error={errors.version} required>
          <input id="version" value={form.version} onChange={(e) => update('version', e.target.value)} placeholder="1.0.0" aria-invalid={Boolean(errors.version)} />
        </Field>
        <Field label="License" htmlFor="license" error={errors.license} required>
          <input id="license" value={form.license} onChange={(e) => update('license', e.target.value)} placeholder="MIT, Apache-2.0, Proprietary…" aria-invalid={Boolean(errors.license)} />
        </Field>
        <Field label="Compatibility" htmlFor="compatibility" error={errors.compatibility} required>
          <input id="compatibility" value={form.compatibility} onChange={(e) => update('compatibility', e.target.value)} placeholder="RIA OS 0.9+" aria-invalid={Boolean(errors.compatibility)} />
        </Field>
        <Field label="Tags" htmlFor="tags" error={errors.tags} hint="Comma-separated" required wide>
          <input id="tags" value={form.tags} onChange={(e) => update('tags', e.target.value)} placeholder="memory, local-first, automation" aria-invalid={Boolean(errors.tags)} />
        </Field>
        <Field label="Installation notes" htmlFor="installationNotes" error={errors.installationNotes} hint="Commands, dependencies, runtime requirements, and rollback steps." required wide>
          <textarea id="installationNotes" value={form.installationNotes} onChange={(e) => update('installationNotes', e.target.value)} rows={4} aria-invalid={Boolean(errors.installationNotes)} />
        </Field>
        <Field label="Security notes" htmlFor="securityNotes" error={errors.securityNotes} hint="Permissions, network access, data handling, secrets, models, and known risks." required wide>
          <textarea id="securityNotes" value={form.securityNotes} onChange={(e) => update('securityNotes', e.target.value)} rows={4} aria-invalid={Boolean(errors.securityNotes)} />
        </Field>
      </div>
      <div className="exchange-form-consents">
        <label className={errors.confirmsOwnership ? 'has-error' : ''}><input type="checkbox" checked={form.confirmsOwnership} onChange={(e) => update('confirmsOwnership', e.target.checked)} /><span>I confirm this software is mine or I have permission to submit it.</span></label>
        {errors.confirmsOwnership && <small className="exchange-field-error"><AlertCircle aria-hidden="true" /> {errors.confirmsOwnership}</small>}
        <label className={errors.acceptsReview ? 'has-error' : ''}><input type="checkbox" checked={form.acceptsReview} onChange={(e) => update('acceptsReview', e.target.checked)} /><span>I understand AION may review security and compatibility before any listing.</span></label>
        {errors.acceptsReview && <small className="exchange-field-error"><AlertCircle aria-hidden="true" /> {errors.acceptsReview}</small>}
      </div>
      <div className="exchange-upload-limitation"><ShieldCheck aria-hidden="true" /><p><strong>No package upload.</strong> Direct package upload requires backend storage. This MVP supports repository submission, local review records, email fallback, and backend-ready JSON submission.</p></div>
      <div className="exchange-dialog-submit-row">
        <p>{SOFTWARE_EXCHANGE_SUBMISSION_ENDPOINT ? 'Configured endpoint will receive this JSON request.' : 'No backend endpoint configured. A local pending record and review email will be prepared.'}</p>
        <button type="submit" className="exchange-button exchange-button-primary" disabled={submitting}><UploadCloud aria-hidden="true" /> {submitting ? 'Preparing…' : 'Submit for review'}</button>
      </div>
    </form>
  )
}

function RepositoryForm({ onSubmitted }: { onSubmitted: (result: SubmissionResult) => void }) {
  const [form, setForm] = useState<RepositorySubmissionInput>(() => ({ ...emptyRepositorySubmission, ...getDraft('repository') }))
  const [errors, setErrors] = useState<Partial<Record<keyof RepositorySubmissionInput, string>>>({})
  const [generalError, setGeneralError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => saveDraft('repository', form), 350)
    return () => window.clearTimeout(timer)
  }, [form])

  const update = <K extends keyof RepositorySubmissionInput>(key: K, value: RepositorySubmissionInput[K]) => {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setSubmitting(true)
    setGeneralError('')
    try {
      const result = await submitRepository(form)
      onSubmitted(result)
      if (!result.endpointAccepted) window.location.href = result.mailtoUrl
    } catch (error) {
      if (error instanceof ExchangeValidationError) setErrors(error.errors as Partial<Record<keyof RepositorySubmissionInput, string>>)
      else setGeneralError(error instanceof Error ? error.message : 'The repository request could not be prepared.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="exchange-submission-form" onSubmit={submit} noValidate>
      <div className="exchange-form-note"><Github aria-hidden="true" /><span><strong>Read-only review request.</strong> This form does not authorize OAuth, clone a private repository, or install code.</span></div>
      {generalError && <div className="exchange-form-alert is-error" role="alert"><AlertCircle aria-hidden="true" /> {generalError}</div>}
      <div className="exchange-form-grid">
        <Field label="Git repository URL" htmlFor="connectRepositoryUrl" error={errors.repositoryUrl} required wide>
          <input id="connectRepositoryUrl" type="url" value={form.repositoryUrl} onChange={(e) => update('repositoryUrl', e.target.value)} placeholder="https://github.com/team/project" aria-invalid={Boolean(errors.repositoryUrl)} />
        </Field>
        <Field label="Branch" htmlFor="branch" error={errors.branch} required>
          <input id="branch" value={form.branch} onChange={(e) => update('branch', e.target.value)} aria-invalid={Boolean(errors.branch)} />
        </Field>
        <Field label="Package type" htmlFor="packageType" error={errors.packageType} required>
          <select id="packageType" value={form.packageType} onChange={(e) => update('packageType', e.target.value)}>
            {['RIA plugin', 'Agent', 'Automation', 'UI module', 'Local app', 'Dataset adapter', 'Robotics connector', 'Other'].map((item) => <option key={item}>{item}</option>)}
          </select>
        </Field>
        <Field label="Manifest file path" htmlFor="manifestPath" error={errors.manifestPath} hint="Path only; no file is uploaded." required>
          <input id="manifestPath" value={form.manifestPath} onChange={(e) => update('manifestPath', e.target.value)} aria-invalid={Boolean(errors.manifestPath)} />
        </Field>
        <Field label="Review contact email" htmlFor="repositoryContactEmail" error={errors.contactEmail} required>
          <input id="repositoryContactEmail" type="email" value={form.contactEmail} onChange={(e) => update('contactEmail', e.target.value)} autoComplete="email" aria-invalid={Boolean(errors.contactEmail)} />
        </Field>
      </div>
      <div className="exchange-form-consents">
        <label className={errors.permissionConfirmed ? 'has-error' : ''}><input type="checkbox" checked={form.permissionConfirmed} onChange={(e) => update('permissionConfirmed', e.target.checked)} /><span>I own this repository or have permission to submit its public metadata for AION review.</span></label>
        {errors.permissionConfirmed && <small className="exchange-field-error"><AlertCircle aria-hidden="true" /> {errors.permissionConfirmed}</small>}
      </div>
      <div className="exchange-dialog-submit-row">
        <p>Submission creates a local pending record. It does not connect an account or grant repository access.</p>
        <button type="submit" className="exchange-button exchange-button-primary" disabled={submitting}><Github aria-hidden="true" /> {submitting ? 'Preparing…' : 'Submit repository for review'}</button>
      </div>
    </form>
  )
}

export default function ExchangeSubmissionDialog({ mode, onClose, onViewPending, onSubmitted }: Props) {
  const [result, setResult] = useState<SubmissionResult | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [onClose])

  const complete = (submissionResult: SubmissionResult) => {
    setResult(submissionResult)
    onSubmitted(submissionResult)
  }

  return (
    <div className="exchange-dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <div className="exchange-dialog" role="dialog" aria-modal="true" aria-labelledby="exchange-dialog-title" ref={dialogRef} tabIndex={-1}>
        <header className="exchange-dialog-header">
          <div>
            <p className="exchange-eyebrow"><span /> {mode === 'software' ? 'SOFTWARE INTAKE' : 'REPOSITORY CONNECTION REQUEST'}</p>
            <h2 id="exchange-dialog-title">{mode === 'software' ? 'Publish tools into the private intelligence ecosystem.' : 'Prepare a repository for review.'}</h2>
            <p>{mode === 'software' ? 'Every submission is owner-controlled, reviewable, and compatibility-checked before publication.' : 'Share repository metadata without granting account access or pretending a backend connection exists.'}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close submission dialog"><X aria-hidden="true" /></button>
        </header>
        <div className="exchange-dialog-body">
          {result ? <SubmissionSuccess result={result} onClose={onViewPending} /> : mode === 'software' ? <SoftwareForm onSubmitted={complete} /> : <RepositoryForm onSubmitted={complete} />}
        </div>
      </div>
    </div>
  )
}
