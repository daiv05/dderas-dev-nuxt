import { describe, expect, it } from 'vitest'
import { projectList, getProject } from '~/data/projects'
import { experienceList } from '~/data/experience'
import { contactInfo } from '~/data/contact'

describe('projects data', () => {
  it('has unique ids', () => {
    const ids = projectList.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
  it('has both locales for every project', () => {
    for (const p of projectList) {
      expect(p.translations.en.name).toBeTruthy()
      expect(p.translations.es.name).toBeTruthy()
    }
  })
  it('features DoctorMaiz, ReportFIA and Vynta in that order', () => {
    expect(projectList.filter((p) => p.featured).map((p) => p.id)).toEqual(['doctormaiz', 'reportfia', 'vynta'])
  })
  it('links ReportFIA public repository', () => {
    expect(getProject('reportfia')?.links.repo).toBe('https://github.com/daiv05/reportes-ues')
  })
})

describe('public profile data', () => {
  it('never exposes a phone number', () => {
    const blob = JSON.stringify({ projectList, experienceList, contactInfo })
    expect(blob).not.toMatch(/\+?503\s?\d{4}/)
  })
  it('lists the current role first', () => {
    expect(experienceList[0]?.end).toBeNull()
  })
})
